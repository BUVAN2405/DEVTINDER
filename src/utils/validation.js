const validator = require("validator");

const validationSignUpData = (req) => {
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(email)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error(" please enter the strong password");
  }
};

const validateToUpdate = (req) => {
  const allowedUpdate = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "about",
    "skills",
  ];

  const isAllowedUpdate = Object.keys(req.body).every((field) =>
    allowedUpdate.includes(field)
  );

  return isAllowedUpdate;
};

function validateToUpdatePassword(req) {
  const { currentPassword, newPassword } = req.body;
  return (
    typeof currentPassword === "string" &&
    typeof newPassword === "string" &&
    newPassword.length >= 6 // Example: minimum length requirement
  );
}

module.exports = {
  validationSignUpData,
  validateToUpdate,
  validateToUpdatePassword,
};
