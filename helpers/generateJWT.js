const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateJWT = (id = "") => {
  return new Promise((resolve, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: "30m",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = generateJWT;
