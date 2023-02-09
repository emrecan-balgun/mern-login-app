import { Router } from "express";

const router = Router();

// POST
router.route("/register").post((req, res) => {
  // register user
  res.json("Register route");
});

router.route("/registerMail").post((req, res) => {
  // send the email
  res.json("Register Mail route");
});

router.route("/authenticate").post((req, res) => {
  // authenticate user
  res.json("Authenticate route");
});

router.route("/login").post((req, res) => {
  // login user
  res.json("Login route");
});

// GET
router.route("/user/:username").get((req, res) => {
  // user with username
  res.json("User route");
});

router.route("/generateOTP").get((req, res) => {
  // generate otp
  res.json("Generate otp route");
});

router.route("/verifyOTP").get((req, res) => {
  // verify generated otp
  res.json("Verify otp route");
});

router.route("createResetSession").get((req, res) => {
  // reset all the veriables
  res.json("Create reset session route");
});

// PUT
router.route("/updateUser").put((req, res) => {
  // is use to update the user profile
  res.json("Update user route");
});

router.route("/resetPassword").put((req, res) => {
  // use to reset password
  res.json("Reset password route");
});

export default router;
