import request from "supertest";

import app from "../server";

import sequelize from "../db/sequelize";
import User from "../db/models/User";

import createTokens from "../utils/createTokens";

const startDatabase = async () => {
  await sequelize.sync({ force: true });
};

const createTableUsers = async () => {
  await User.sync({ force: true });
};

describe("Test auth", () => {
  describe("Test signup", () => {
    beforeEach(async () => {
      // await startDatabase();
      await createTableUsers();
    });

    test("should create a new user and return message", async () => {
      const email = "zolotukhinpv@i.ua";
      const password = "passWord1";
      const newResourcePayload = {
        email,
        password,
      };
      const response = await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload);

      expect(response.statusCode).toBe(201);
    });

    test("should return email successfully verify message", async () => {
      const email = "zolotukhinpv@i.ua";
      const password = "passWord1";
      const { confirmationToken } = createTokens({ email });
      const newResourcePayload = {
        email,
        password,
      };
      await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload)
        .expect(201);

      console.log(confirmationToken);

      const response = await request(app)
        .get(`/api/auth/confirm`)
        .query({ token: confirmationToken });

      expect(response.statusCode).toBe(200);
    });

    test("should return email verify error", async () => {
      const email = "zolotukhinpv@i.ua";
      const password = "passWord1";
      const { confirmationToken } = createTokens({
        email: "zolotukhinpv@gmail.com",
      });
      const expectedMessage = `User not found`;
      const newResourcePayload = {
        email,
        password,
      };
      await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload)
        .expect(201);

      console.log(confirmationToken);

      const response = await request(app)
        .get(`/api/auth/confirm`)
        .query({ token: confirmationToken });

      expect(response.statusCode).toBe(404);
      expect(response.body.message).toBe(expectedMessage);
    });

    test("should return duplicate error", async () => {
      const email = "zolotukhinpv@i.ua";
      const password = "passWord1";
      const newResourcePayload = {
        email,
        password,
      };
      await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload)
        .expect(201);

      const response = await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload);

      expect(response.statusCode).toBe(409);
    });

    test("should return email validation error", async () => {
      const email = "zolotukhinpv";
      const password = "passWord1";
      const expectedMessage = `"email" with value "${email}" fails to match the required pattern:`;
      const newResourcePayload = {
        email,
        password,
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toMatch(expectedMessage);
    });

    test("should return password validation error", async () => {
      const email = "zolotukhinpv@i.ua";
      const password = "pass";
      const expectedMessage = `"password" with value "${password}" fails to match the required pattern:`;
      const newResourcePayload = {
        email,
        password,
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toMatch(expectedMessage);
    });

    test("should return email empty error", async () => {
      const email = "";
      const password = "passWord1";
      const expectedMessage = `"email" is not allowed to be empty`;
      const newResourcePayload = {
        email,
        password,
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(expectedMessage);
    });

    test("should return password empty error", async () => {
      const email = "zolotukhinpv@i.ua";
      const password = "";
      const expectedMessage = `"password" is not allowed to be empty`;
      const newResourcePayload = {
        email,
        password,
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(expectedMessage);
    });

    test("should return email required error", async () => {
      const email = "zolotukhinpv@i.ua";
      const password = "passWord1";
      const expectedMessage = `"email\" is required`;
      const newResourcePayload = {
        password,
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(expectedMessage);
    });

    test("should return password required error", async () => {
      const email = "zolotukhinpv@i.ua";
      const password = "passWord1";
      const expectedMessage = `"password\" is required`;
      const newResourcePayload = {
        email,
      };

      const response = await request(app)
        .post("/api/auth/signup")
        .send(newResourcePayload);

      expect(response.statusCode).toBe(400);
      expect(response.body.message).toBe(expectedMessage);
    });
  });
});
