import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();
const PORT = 8080;

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by");

// HTTP GET request
app.get("/", (req, res) => {
  res.status(201).json("Home GET Request");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});