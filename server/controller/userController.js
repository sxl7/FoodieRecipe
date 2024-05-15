const userModal = require("../models/userSchema");
const validation = require("../utils/validation");
const bcrypt = require("bcrypt");
require("dotenv").config();

const uRegister = async (req, res) => {
  const { error } = validation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { firstName, lastName, email, password } = req.body;

  const emailExist = await userModal.findOne({ email });
  if (emailExist) return res.status(400).send("Email already exists");

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  const user = new userModal({
    firstName,
    lastName,
    password: hashPassword,
    email,
  });

  try {
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: `User registered successfully ${savedUser.id}`});
  } catch (e) {
    res.status(400).send(e.message);
    console.log(e.message);
  }
};

const uLogin = async (req, res) => {
  const { error } = validation.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  const user = await userModal.findOne({ email });
  if (!user)
    return res
      .status(400)
      .send("Email or Password is wrong, check your email and password");

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .send("Email or Password is wrong, check your email and password");

  res.status(201).json({ message: `Walcome Back! ${user.firstName}`});
};

module.exports = {
  uRegister,
  uLogin,
};
