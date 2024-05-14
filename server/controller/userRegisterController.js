const registerModal = require("../models/userSchema");
const validation = require("../utils/validation");

const uRegister = async (req, res) => {
  const { error } = validation.registerValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { firstName, lastName, email, password } = req.body;
  const user = new registerModal({
    firstName,
    lastName,
    password,
    email,
  });
  try {
    const savedUser = await user.save();
    res
      .status(201)
      .json({ message: "User registered successfully", user: savedUser.id });
  } catch (e) {
    res.status(400).send(e.message);
    console.log(e.message);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await schemaModel.UserModel.findById(userId);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(product);
  } catch (e) {
    /* res.status(500).json({message:e.message}) */
    console.log(e.message);
  }
};

const upDateUserInfor = async (req, res) => {
  try {
    const userId = req.params.id;
    const userInfo = await schemaModel.UserModel.findById(userId);
    res.status(200).json(product);
  } catch (e) {
    /* res.status(500).json({message:e.message}) */
    console.log(e.message);
  }
};

module.exports = {
  getUserInfo,
  upDateUserInfor,
  uRegister,
};
