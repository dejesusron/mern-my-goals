import mongoose from "mongoose";

const goalSchema = mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User"
        },
        title: {
            type: String,
            required: [true, "Please add a title value"]
        },
        desc: {
            type: String,
            required: [true, "Please add a description value"]
        },
        age: {
            type: Number,
            required: [true, "Please add a age value"]
        }
    },
    {
        timestamps: true
    }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;