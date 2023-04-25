const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const checkJWT = async (req, res, next) => {
  const token = req.headers["x-token"];

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No token in request",
    });
  }

  try {
    const { id } = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Token do not match with the user",
      });
    }

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({
      ok: false,
      msg: "Non-existent or not a valid token",
    });
  }
};

module.exports = checkJWT;
