import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../model/User.model.js";

export async function register(req, res) {
  try {
    const { username, password, email, profile } = req.body;

    // check the existing user
    const existUsername = new Promise((resolve, reject) => {
      UserModel.findOne({ username }, function (err, user) {
        if (err) reject(new Error(err));
        if (user) reject({ error: "Username already exists" });

        resolve();
      });
    });

    // check the existing email
    const existEmail = new Promise((resolve, reject) => {
      UserModel.findOne({ email }, function (err, email) {
        if (err) reject(new Error(err));
        if (email) reject({ error: "Email already exists" });

        resolve();
      });
    });

    // create new user
    Promise.all([existUsername, existEmail])
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 10)
            .then((hashedPassword) => {
              const user = new UserModel({
                username,
                password: hashedPassword,
                email,
                profile: profile || "",
              });

              // return save result as a response
              user
                .save()
                .then((result) =>
                  res.status(201).send({ message: "User created successfully" })
                )
                .catch((error) => res.status(500).send({ error }));
            })
            .catch((error) => {
              return res
                .status(500)
                .send({ error: "Enable to hashed password" });
            });
        }
      })
      .catch((error) => {
        return res.status(500).send({ error });
      });
  } catch (error) {
    return res.status(500).send(error);
  }
}

export async function login(req, res) {
  const { username, password } = req.body;
  try {
    UserModel.findOne({ username })
      .then((user) => {
        bcrypt
          .compare(password, user.password)
          .then((result) => {
            if (!result)
              return res.status(400).send({ error: "Don't match password" });

            // create jwt token
            const token = jwt.sign(
              {
                userId: user._id,
                username: user.username,
              },
              "secret",
              { expiresIn: "24h" }
            );

            return res
              .status(200)
              .send({
                message: "Login successfully",
                username: user.username,
                token,
              });
          })
          .catch((error) => {
            return res.status(400).send({ error: "Invalid password" });
          });
      })
      .catch((error) => {
        return res.status(404).send({ error: "User not found" });
      });
  } catch (error) {
    return res.status(500).send({ error });
  }
}

export async function getUser(req, res) {
  res.json("Get user route");
}

export async function updateUser(req, res) {
  res.json("Update user route");
}

export async function generateOTP(req, res) {
  res.json("Generate OTP route");
}

export async function verifyOTP(req, res) {
  res.json("Verify OTP route");
}

export async function createResetSession(req, res) {
  res.json("Create reset session route");
}

export async function resetPassword(req, res) {
  res.json("Reset password route");
}
