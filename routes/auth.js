const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const PASS_SEC = "SkillGate";
const JWT_SEC = "SkillGate";

//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNo: req.body.phoneNo,
    address: req.body.address,
    dateOfBirth: req.body.dateOfBirth,
    isAdmin: req.body.isAdmin,
    isActivated: req.body.isActivated,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      "SkillGate"
    ).toString(),
    confirmPassword: CryptoJS.AES.encrypt(
      req.body.confirmPassword,
      "SkillGate"
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
    });

    !user && res.status(401).json("Email is not valid!");

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    originalPassword != inputPassword && res.status(401).json("Wrong Password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
