const jwt = require("jsonwebtoken");

module.exports.adminAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) return res.status(401).json({ msg: "No authentication token, authorization denied" });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.status(401).json({ msg: "Unverified token, action denied" });
    next();
  } catch (err) {
    res.status(401).json({ msg: err.message });
  }
};
