const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const usersController = {
  register: asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      throw new Error("Please all fields are required");
    }

    // ! check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      throw new Error("User already exist");
    }
    // ! Hash the password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate a 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedVerificationCode = await bcrypt.hash(verificationCode, salt);

    // ! Create user and save to DB
    const userCreated = await User.create({
      email,
      username,
      password: hashedPassword,
      verificationCode: hashedVerificationCode,
      isVerified: false,
    });

    // send the response
    res.json({
      username: userCreated.username,
      email: userCreated.email,
      id: userCreated._id,
      message: "Registration successful. Please check your email for the verification code.",
    });

    // TODO: Implement email sending logic here to send `verificationCode` to `email`
    console.log(`Verification code for ${email}: ${verificationCode}`);
  }),

  // !login
  login: asyncHandler(async (req, res) => {
    // Get the user data
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    // Check if the user's email is verified
    if (!user.isVerified) {
      return res.status(401).json({ message: "Please verify your email before logging in." });
    }

    // Compare user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid login credentials" });
    }

    // ! Generate Token
    const token = jwt.sign({ id: user._id }, "howareyoudoing", {
      expiresIn: "30d",
    });

    // Send the response
    res.status(200).json({
      message: "Login success",
      token,
      id: user._id,
      email: user.email,
      username: user.username,
    });
  }),

  // * Profile
  profile: asyncHandler(async (req, res) => {
    // Find user
    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found.");
    }

    // send the response
    res.json({
      username: user.username,
      email: user.email,
    });
  }),

  // * Change Password
  changeUserPassword: asyncHandler(async (req, res) => {
    const { newPassword } = req.body;

    const user = await User.findById(req.user);
    if (!user) {
      throw new Error("User not found");
    }

    // hash password b4 saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;

    await user.save({
      //  This option instructs Mongoose to skip the built-in validation checks before saving the user object.
      validateBeforeSave: false
    });

    res.json({ message: "Password Changed successfully" });
  }),

  // * Update User Profile
  updateUserProfile: asyncHandler(async (req, res) => {
    const { email, username } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user,
      {
        username,
        email,
      },
      {
        new: true,
      }
    );

    res.json({ message: "User Profile updated successfully", updatedUser });
  }),

  // * Verify Email
  verifyEmail: asyncHandler(async (req, res) => {
    const { email, verificationCode } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or verification code." });
    }

    // Compare the provided code with the stored hashed code
    const isMatch = await bcrypt.compare(verificationCode, user.verificationCode);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or verification code." });
    }

    // Update user as verified and remove the verification code
    user.isVerified = true;
    user.verificationCode = undefined; // Remove the code after verification
    await user.save();

    res.status(200).json({ message: "Email verified successfully. You can now log in." });
  }),
};

module.exports = usersController;