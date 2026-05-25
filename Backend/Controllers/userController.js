const asyncHandler = require('../Middleware/asyncHandler');
const User = require('../Models/User');

const sendTokenResponse = (user, statusCode, res) => {
    const token = user.generateToken();
    res.status(statusCode).json(
    {success: true, token, data: {_id: user._id,name: user.name,email: user.email,role: user.role,avatar: user.avatar}});
};

const registerUser = asyncHandler(async (req, res) => {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Name, Email and Password - all three are required!");
    }
    const userExists = await User.findOne({email: email.toLowerCase()});
    if(userExists){res.status(400); throw new Error("Email already registered!");}
    const user = await User.create({name,email,password});
    sendTokenResponse(user,201,res);
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password){
    res.status(400);
    throw new Error('Enter both Email and Password!');
  }
  const user = await User.findOne({ email: email.toLowerCase() }).select('+password');
  if (!user || !(await user.comparePassword(password))){
    res.status(401);
    throw new Error('Either Email or Password are wrong!');
  }
  sendTokenResponse(user, 200, res);
});

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  res.status(200).json({ success: true, data: user });
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (!user) { res.status(404); throw new Error('User not found!'); }
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;
  if (req.body.password) user.password = req.body.password; 
  if (req.body.address) user.address = req.body.address;
  const updated = await user.save();  
  sendTokenResponse(updated, 200, res);
});

module.exports = { registerUser, loginUser, getUserProfile, updateUserProfile };