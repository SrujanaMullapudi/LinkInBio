import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";

import getAllUserActionLinks from "./server/Routes/getLinks.js";
const app = express();
const PORT = process.env.PORT || 3001;
const URI = `mongodb+srv://virtualLab:${process.env.DB_PASSWORD}@cluster0.e6bxe.mongodb.net/?retryWrites=true&w=majority`;
app.use(helmet());
var corsOptions = {
  origin: "http://localhost:3000/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.options("*", cors());
app.use(cors(corsOptions));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));

app.use("/links", getAllUserActionLinks);

mongoose
  .connect(URI, { useNewUrlParser: true })
  .then(() => {
    console.log("database connected");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  try {
    res.status(200).json({
      method: "SERVER",
      status: res.statusCode,
      message: "Server Active",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      method: "SERVER",
      status: res.statusCode,
      message: "Server Inactive",
    });
  }
});
app.listen(PORT, () => {
  if (process.env.NODE_ENV == "production") {
  } else {
    console.log(`server running at: ${PORT}`);
  }
});
