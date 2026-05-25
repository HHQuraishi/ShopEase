const jwt = require("jsonwebtoken");
const asyncHandler = require("./asyncHandler");
const User = require("../Models/User");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    res.status(401);
    throw new Error("Login zaroori hai! Pehle login karo.");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) {
    res.status(401);
    throw new Error("Is token ka user ab exist nahi karta!");
  }

  if (!user.isActive) {
    res.status(401);
    throw new Error("Account deactivate ho chuka hai!");
  }
  req.user = user;

  next();
});

const admin = (req, res, next) => {
    if(req.user && req.user.role === 'admin') {
    next();}
    else {
    res.status(403);
    throw new Error('Admin access required! Tumhare paas permission nahi.');}
};

const seller = (req, res, next) => {
    if(req.user && (req.user.role === 'seller' || req.user.role === 'admin')){
    next();}
    else{
    res.status(403);
    throw new Error('Seller access required!');}
};

module.exports = { protect, admin, seller };
