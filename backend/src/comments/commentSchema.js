import mongoose from "mongoose";

const CommentSchema = mongoose.Schema;

const commentSchema = new CommentSchema(
    {
        comment: { type: String, required: true },
        teamID: { type: CommentSchema.Types.ObjectId, ref: "Team", required: true },
        postedBy: { type: CommentSchema.Types.ObjectId, ref: "User", required: true },
    },
    {
        timestamps: {},
    }
);

const Comment = mongoose.model("Comment", commentSchema);

export { Comment };
