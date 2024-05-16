const userModal = require("../models/userSchema");
const validation = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwtToken = require('jsonwebtoken')
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
      .json({ message: `Congratulations! registered successfully, welcome ${savedUser.firstName}!`});
  } catch (e) {
    res.status(400).send(e.message);
    console.log(e.message);
  }
};

const uLogin = async (req, res) => {
  const { error } = validation.loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  //check email
  const user = await userModal.findOne({ email });
  if (!user)
    return res
      .status(400)
      .send("Email or Password is wrong, check your email and password");

  // check password
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword)
    return res
      .status(400)
      .send("Email or Password is wrong, check your email and password");


  const token = jwtToken.sign({_id : user._id}, process.env.JWT_TOKEN_KEY)
  res.header('auth-token',token).send(token)

};

module.exports = {
  uRegister,
  uLogin,
};
