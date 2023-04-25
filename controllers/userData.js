const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateJWT = require("../helpers/generateJWT");

const registerUser = async (req, res) => {
  const {
    name,
    lastName,
    age,
    email,
    password,
    repPassword
  } = req.body.user;

  try {
    const emailExists = await User.findOne({
      email: email
    });

    if (emailExists) {
      return res.status(400).json({
        ok: false,
        msg: "This email is already registered. Try a new one."
      });
    }

    if (password !== repPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Passwords do not match."
      })
    }

    const salt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      name,
      lastName,
      age,
      email,
      password: hashedPassword
    });

    await newUser.save();
    const token = await generateJWT(newUser._id);

    return res.status(200).json({
      ok: true,
      user: {
        name: newUser.name,
        lastName: newUser.lastName,
        email: newUser.email,
        _id: newUser._id,
        token
      },
    });
  } catch (error) {
    console.log(error)
    return res.status(503).json({
      ok: false,
      msg: "Something happened...",
    });
  }
};

const logInUser = async (req, res) => {
  const {
    email,
    password
  } = req.body.user;

  try {
    const userFromDb = await User.findOne({
      email: email
    });

    if (!userFromDb) {
      return res.status(400).json({
        ok: false,
        msg: "User doesn't exist. Please register."
      })
    }

    const comparedPassword = bcrypt.compareSync(password, userFromDb.password);
    if (!comparedPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Email and password don't match."
      })
    }

    const token = await generateJWT(userFromDb._id);

    return res.status(200).json({
      ok: true,
      user: {...userFromDb, token}
    });

  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened"
    });
  }
};

const deleteUser = async (req, res) => {
  const {
    email
  } = req.body.user;

  try {
    await User.deleteOne({
      email: email
    });

    return res.status(200).json({
      ok: true,
      msg: "Deleted ok",
    });
  } catch (error) {
    return res.status(503).json({
      ok: false,
      msg: "Something happened"
    });
  }
};

module.exports = {
  registerUser,
  logInUser,
  deleteUser
};