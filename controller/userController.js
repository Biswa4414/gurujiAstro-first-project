const bcrypt = require("bcrypt");
const User = require("../model/userSchema");
const { ErrorHandler } = require("../middleware/error");
const sendToken = require("../utils/jwtToken");
const catchAsyncErrors = require("../middleware/catchAsyncError");

//REGISTER ROUTER
const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return next(new ErrorHandler("Missing Credentials"));
    }

    //email and usernames are unique
    const userEmailsExist = await User.findOne({ email: email });

    if (userEmailsExist) {
      return next(new ErrorHandler("Email already exist"));
    }

    const isUserPhoneExist = await User.findOne({ phone });
    if (isUserPhoneExist) {
      return next(new ErrorHandler("Phone Number already exist"));
    }

    //hashing the password

    const hashedPassword = await bcrypt.hash(
      password,
      parseInt(process.env.SALT)
    );

    //store data in DB
    const userObj = new User({
      //schema key : value
      name: name,
      email: email,
      phone: phone,
      password: hashedPassword,
    });
    const user = await userObj.save();
    sendToken(user, 201, res, "Register Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//LOGIN ROUTER
const login = catchAsyncErrors(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ErrorHandler("Missing Credentials"));
    }
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHandler("Email Doesn't Exist", 400));
    }
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid Password", 400));
    }
    sendToken(user, 201, res, "Login Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

//LOGOUT ROUTER
const logout = catchAsyncErrors(async (req, res, next) => {
  res
    .status(201)
    .cookie("Token", "", {
      httpOnly: true,
      expires: new Date(Date.now()),
    })
    .json({
      success: true,
      message: "Logout Successfully",
    });
});

module.exports = { register, login, logout };
