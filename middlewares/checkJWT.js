const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const checkJWT = async (req, res, next) => {

  const token = req.headers["x-token"];

  try {
    const {
      id
    } = jwt.verify(token, process.env.TOKEN_SECRET)

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Not a valid token",
      });
    }

    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        ok: false,
        msg: "Token expired",
      });
    } else if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "Non-existent token",
      });
    }
  }
};

module.exports = checkJWT;


//Ultima eleccion
/* const checkJWT = async (req, res, next) => {

  const token = req.headers["x-token"];

  try {
    if (!token) {
      return res.status(401).json({
        ok: false,
        msg: "No token in request",
      });
    }

    const {
      id
    } = jwt.verify(token, process.env.TOKEN_SECRET, {ignoreExpiration: false}, async (error, decoded) => {
      if (error) {
        if (error.name === "TokenExpiredError") {
          return res.status(401).json({
            ok: false,
            msg: "Token expired",
          });
        } else {
          return res.status(401).json({
            ok: false,
            msg: "Non-existent or not a valid token",
          });
        }
      }
    });

    const user = await User.findById(id);

    if (!user) {
      return res.status(401).json({
        ok: false,
        msg: "Token do not match with the user",
      });
    }

    next();

  } catch (error) {
    console.log("ERROR, ERROR")
    console.log(error)
    console.log("ERROR, ERROR")
    return res.status(401).json({
      ok: false,
      msg: "Non-existent or not a valid token",
    });
  }
}; */






/*   const checkJWT = async (req, res, next) => {

    const token = req.headers["x-token"];
  
    try {
      if (!token) {
        return res.status(401).json({
          ok: false,
          msg: "No token in request",
        });
      }
  
      const {
        id, exp
      } = jwt.verify(token, process.env.TOKEN_SECRET);
  
      const user = await User.findById(id);
  
      if (!user) {
        return res.status(401).json({
          ok: false,
          msg: "Token do not match with the user",
        });
      }
  
      const isTokenExpired = Date.now() >= exp * 1000;
  
      if (isTokenExpired) {
        return res.status(401).json({
          ok: false,
          msg: "Token expired",
        });
      }
  
      next();
  
    } catch (error) {
      return res.status(401).json({
        ok: false,
        msg: "Non-existent or not a valid token",
      });
    }
  }; */