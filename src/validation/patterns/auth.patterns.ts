export const emailPattern = {
  regexp: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  message: "Please enter a valid email address.",
};

export const passwordPattern = {
  regexp: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/,
  message: "Password must contain at least one uppercase letter, one lowercase letter, numeric character, one special character",
};

export const fullnamePattern = {
  regexp: /^[a-zA-Z ]*$/,
  message: "Special characters and numbers are not allowed in Full Name",
};

export const usernamePattern = {
  regexp: /^[a-zA-Z0-9 ]*$/,
  message: "Special characters are not allowed in Full Name",
};