import mongoose from "mongoose";

const UserSchema = mongoose.Schema;

const userSchema = new UserSchema(
    {
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },

        comments: [{ type: UserSchema.Types.ObjectId, ref: "Comment" }],
        upVotedTeams: [{ type: UserSchema.Types.ObjectId, ref: "Team" }],
    },
    {
        timestamps: {},
    }
);

const User = mongoose.model("User", userSchema);

export { User };
