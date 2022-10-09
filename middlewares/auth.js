var jwt = require("jsonwebtoken");
const { RequestError } = require("../helpers");

const auth = (req, res, next) => {
  try {
    const token_type = req.headers.authorization?.split(" ")[0];
    const token = req.headers.authorization?.split(" ")[1];
    if (token_type !== "Bearer" || !token) {
      throw RequestError(401, "Not authorized");
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
