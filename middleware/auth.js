// Programs implemented for authorization functionality
const config = require("config");
const jwt = require("jsonwebtoken");

// Auth function to check if used is logged in
function auth(req, res, next) {
  // Defines header so that token may be verified
  const token = req.header("x-auth-token");

  // Check for token
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    // Verify token exists
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    // Add the user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
