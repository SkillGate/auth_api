const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const healthRoute = require("./routes/health");
const cors = require("cors");

dotenv.config();

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connection Successful!"))
  .catch((err) => {
    console.log(err);
  });

var corsOptions = {
  origin: [
    "https://63255e563cd2e07f436de993--resonant-licorice-b9748e.netlify.app",
    "http://localhost:3000",
    "https://fluffy-sopapillas-e80ba6.netlify.app",
  ],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested, Content-Type, Accept Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "POST, PUT, PATCH, GET, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(express.json());
app.use("/api/v1/health", healthRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

// app.listen(5005, () => {
//   console.log("Backend user server is running!");
// });
