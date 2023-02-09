export async function register(req, res) {
  // register user
  res.json("Register route");
};

export async function login(req, res) {
  // login user (username, password)
  res.json("Login route");
};

export async function getUser(req, res) {
  res.json("Get user route");
};

export async function updateUser(req, res) {
  res.json("Update user route");
};

export async function generateOTP(req, res) {
  res.json("Generate OTP route");
};

export async function verifyOTP(req, res) {
  res.json("Verify OTP route");
};

export async function createResetSession(req, res) {
  res.json("Create reset session route");
};

export async function resetPassword(req, res) {
  res.json("Reset password route");
};

