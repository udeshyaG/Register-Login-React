const jwt = require("jsonwebtoken");
const config = require("config");

const middleWare = (req, res, next) => {
  //Get Token from header
  const token = req.header("x-auth-token");

  //Check if there is no token
  if (!token) {
    return res.status(401).json({ msg: "No Token, Authorization denied" });
  }

  //if there is a token then decode and verify
  try {
    //pull out the payload from the token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //then stick the user present in the token to the request
    //ie.. userId gets added to the request parameter
    req.user = decoded.user;
    next();
  } catch (err) {
    //error if token is not valid
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = middleWare;
