import jwt from "jsonwebtoken";

export default async function Auth(req, res, next) {
  try {
    // access authorization header to validate request
    const token = req.headers.authorization.split(" ")[1];

    // retrive the user details fo the logged in user
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;

    res.json(decodedToken);
  } catch (error) {
    res.status(401).send({ error: "Authentication failed" });
  }
}

export function localVariables(req, res, next) {
  req.app.locals = {
    OTP: null,
    resetSession: false,
  };
  next();
}
