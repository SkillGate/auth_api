const router = require("express").Router();

router.get("/", async (req, res) => {
  res.status(200).json({ msg: "Health endpoint" });
});

module.exports = router;