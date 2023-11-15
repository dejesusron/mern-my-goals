import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please add a name field"]
        },
        age: {
            type: Number,
            required: [true, "Please add a age field"]
        },
        email: {
            type: String,
            required: [true, "Please add a email field"],
            unique: true
        },
        password: {
            type: String,
            required: [true, "Please add a password field"]
        }
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);

export default User;