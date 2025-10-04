import { Request, Response } from "express";

import multer, { StorageEngine } from "multer";
import path from "node:path";

import HttpError from "../typescript/classes/HttpError";

const destination: string = path.resolve("images");

const storage: StorageEngine = multer.diskStorage({
  // destination: (req, file, cb)=> {
  //     cb(null, destination);
  // },
  destination,
  filename: (req, file, cb) => {
    const uniquePreffix = `${Date.now()}_${Math.round(Math.random() * 1e9)}`;
    const filename = `${uniquePreffix}_${file.originalname}`;
    cb(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req: Request, file:any, cb:any) => {
  console.log("file: ", file);
  
  const extension = file.originalname.split(".").pop();
  if (extension === "exe") {
    return cb(new HttpError(400, ".exe extension not allow"));
  }
  cb(null, true);
};

const upload = multer({
  storage,
  limits,
  fileFilter,
});

export default upload;
