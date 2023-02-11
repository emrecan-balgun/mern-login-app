import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import UserModel from "../model/User.model.js";

// middleware for verify user
export async function verifyUser(req, res, next) {
  try {
    const { username } = req.method == "GET" ? req.query : req.body;

    // check the existing user
    const exist = await UserModel.findOne({ username });
    if(!exist) return res.status(404).send({ error: "User not found" });
    next();
  } catch (error) {
    return res.status(404).send({ error: "Auth failed" });
  }
}

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
              process.env.JWT_SECRET,
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
  const { username } = req.params;

  try {
    if(!username) return res.status(501).send({ error: "Invalid username" });
    UserModel.findOne({ username }, function(err, user){
      if(err) return res.status(500).send({ err });
      if(!user) return res.status(501).send({ error: "Couldn't find user" });

      // remove password from user
      // mongoose return unnecessary data with object so convert it to into json
      const { password, ...rest } = Object.assign({}, user.toJSON());

      return res.status(200).send({ rest });
    })
  } catch(error ) {
    return res.status(404).send({ error: "User not found" });
  }
}

export async function updateUser(req, res) {
  try{
    const id = req.query.id;

    if(id) {
      const body = req.body;

      // update the data
      UserModel.updateOne({_id: id}, body, function(err, data) {
        if(err) throw err;

        return res.status(201).send({ message: "User updated successfully" });
      })
    }else {
      return res.status(401).send({ error: "User not found" });
    }
  } catch(error) {
    return res.status(401).send({ error });
  }
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
