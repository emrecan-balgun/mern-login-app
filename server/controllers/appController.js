import UserModel from "../model/User.model.js";
import bcrypt from "bcrypt";

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
  // login user (username, password)
  res.json("Login route");
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
