const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  if (req.body.password !== req.body.confirmPassword) {
    return res
      .status(400)
      .json({ error: "Password and Confirm Password do not match" });
  }

  const newUser = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
    phone: req.body.phone,
    address: req.body.address || "",
    companyName: req.body.companyName || "",
    dateOfBirth: req.body.dateOfBirth,
    linkedIn: req.body.linkedIn || "",
    gitHub: req.body.gitHub || "",
    blog: req.body.blog || "",
    role: req.body.role || "",
    skills: req.body.skills || [],
    portfolio: req.body.portfolio || "",
    biography: req.body.biography || "",
    experience: req.body.experience || [],
    education: req.body.education || [],
    projects: req.body.projects || [],
    awards: req.body.awards || [],
    volunteering: req.body.volunteering || [],
    avatar: req.body.avatar || "",
    hourly_rate: req.body.hourly_rate || 0,
    level: req.body.level || "",
    availability: req.body.availability || "",
    location: req.body.location || "",
    num_of_connections: req.body.num_of_connections || 0,
    overview: req.body.overview || "",
    userType: req.body.userType || "Candidate",
    isAdmin: req.body.isAdmin || false,
    isActivated: req.body.isActivated || true,
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

    if (!user) {
      return res.status(401).json("Email is not valid!");
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASS_SEC
    );

    const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword !== inputPassword) {
      return res.status(402).json("Wrong Password");
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: "3d" }
    );

    const { password, confirmPassword, ...others } = user._doc;
    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
