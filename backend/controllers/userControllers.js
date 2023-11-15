import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

// @desc: Register new user
// @route: POST /api/users
// @access: Public
const addUser = asyncHandler(async (req, res) => {
    const { name, email, age, password } = req.body;

    // fill all the fields
    if (!name || !email || !age || !password) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    // check if the user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists"); 
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
        name, 
        email, 
        age, 
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid user data");
    }
});

// @desc: Authenticate a user
// @route: POST /api/users/login
// @access: Public
const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // CHeck for user email
    const user = await User.findOne({email});

    // Check the password
    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        });
    } else {
        res.status(400);
        throw new Error("Invalid credentials");
    }
});

// @desc: Get user data
// @route: GET /api/users/me
// @access: Private
const getUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

export { addUser, loginUser, getUser };