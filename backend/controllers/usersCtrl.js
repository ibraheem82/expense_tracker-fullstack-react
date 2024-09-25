const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../model/User");

const usersController = {
    register: asyncHandler(async(req, res) => {
        const {username, email, password} = req.body;

        if(!username || !email || !password) {
            throw new Error("Please all fields are required");
        }

        // ! check if user already exists
        const userExists  = await User.findOne({email});
        if(userExists) {
            throw new Error("User already exist");
        }
        // ! Hash the password

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ! Create user and save to DB

        const userCreated = await User.create({
            email,
            username,
            password:hashedPassword
        });

        // send the response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id:userCreated._id
        })


    }),



    // !login
    login: asyncHandler(async(req, res) => {
        // get the user data
        const {email, password} = req.body;

        const user = await User.findOne({email});
        if(!user){
            throw new Error("Invalid login credentials");
        };

        // compare user password

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("Invalid login credentials");
        }

        // ! Generate Token 
        const token = jwt.sign({id: user._id}, 'howareyoudoing', {
            expiresIn: "30d"
        });

        // send the response
        res.json({
            message: 'Login success',
            token,
            id: user._id,
            email: user.email,
            username: user.username
        });
    }),

    // * Profile
    profile: asyncHandler(async(req, res) => {
        // Find user

        const user = await User.findById(req.user);
        if(!user){
            throw new Error("User not found.");
        }


        // send the response
        res.json({
            username: user.username,
            email: user.email
        });
    }),
}
module.exports = usersController;