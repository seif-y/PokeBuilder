import mongoose from "mongoose";

const UserSchema = mongoose.Schema;

const userSchema = new UserSchema(
    {
        username: { type: String, required: [true, "A username is required"], unique: true },
        password: { type: String, required: [true, "A password is required"] },

        comments: [{ type: UserSchema.Types.ObjectId, ref: "Comment" }],
        upvotedTeams: [{ type: UserSchema.Types.ObjectId, ref: "Team" }],
    },
    {
        timestamps: {},
    }
);

const User = mongoose.model("User", userSchema);

export { User };
