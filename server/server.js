import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import connect from "./database/conn.js";

const app = express();
dotenv.config();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

// HTTP GET request
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// Start server only when we have valid connection
connect().then(() => {
  try {
    app.listen(process.env.PORT || 5000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Cannot connect to server");
  }
}).catch(error => {
  console.log("Cannot connect to database");
})
