import asyncHandler from "express-async-handler";
import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";

// @desc: display all of the goals
// @route: GET /api/goals
// @access: Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user.id });
    res.status(200).json(goals);
});

// @desc: add a goal
// @route: POST /api/goals
// @access: Public
const addGoal = asyncHandler(async (req, res) => {
    const { title, desc, age } = req.body;

    const goalExists = await Goal.findOne({ title });

    if (goalExists) {
        res.status(400);
        throw new Error("Goal already exist");
    }

    const goal = await Goal.create({ title, desc, age, user: req.user.id });

    if (goal) {
        res.status(201).json(goal);
    } else {
        res.status(400);
        throw new Error("Invalid goal data");
    }

    res.status(200).json(goal);
});

// @desc: display a goal
// @route: GET /api/goals/:id
// @access: Public
const getGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    res.status(200).json(goal);
});

// @desc: update a goal
// @route: PUT /api/goals/:id
// @access: Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // make sure the login user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {new: true});

    res.status(200).json(updatedGoal);
});

// @desc: delete a goal
// @route: DELETE /api/goals/:id
// @access: Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error("Goal not found");
    }

    // check for user
    if (!req.user) {
        res.status(401);
        throw new Error("User not found");
    }

    // make sure the login user matches the goal user
    if (goal.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error("User not authorized");
    }

    await goal.deleteOne();

    const { title, _id } = goal;

    res.status(200).json({_id, title});
});

export { getGoals, getGoal, addGoal, updateGoal, deleteGoal };