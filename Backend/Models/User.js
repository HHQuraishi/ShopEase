const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Name is mandatoty!"], trim: true },
  email: {
    type: String,
    required: [true, "Email is mandatory"],
    trim: true,
    unique: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter Valid Email!"] },
  password: {
    type: String,
    required: [true, "Password is mandatory!"],
    minLength: [6, "Password must be atleast 6 characters long"],
    select: false },
  role: {
    type: String,
    enum: ["user","admin"],
    default: "user"},
  avatar: {
    type: String,
    default: "default_avatar.jpg"},
  address: {
    street: String,
    city: String,
    state: String,
    zipcode: String },
  isActive: {
    type: Boolean,
    default: true }
  }, {timestamps: true}
);

// Hashing
userSchema.pre("save", async function(next){
    if(!this.isModified('password')) return; // if not modified then return
    this.password = await bcrypt.hash(this.password, 12); // if modified then hash
});

userSchema.methods.generateToken = function(){
  return jwt.sign({id: this._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRE || '30d'});
};

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTA5MWE4N2M2MTRjZGVlYjUyZGEzNCIsImlhdCI6MTc3OTQ3MDc2MSwiZXhwIjoxNzgyMDYyNzYxfQ.lmPe_sPbhY_7A2aWnHmDn66rU7gSAjFhVCYxTuJxfIE"
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMTA5MWE4N2M2MTRjZGVlYjUyZGEzNCIsImlhdCI6MTc3OTQ3MTEzMSwiZXhwIjoxNzgyMDYzMTMxfQ.uum7v5rxpbpTy5sPFPC3X-QDdkWpP52orfiCJN1-0j4"