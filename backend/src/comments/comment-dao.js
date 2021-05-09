import { Comment } from "./commentSchema";
import { retrieveUser } from "../users/user-dao";
import { User } from "../users/userSchema";

async function createComment(comment) {
    const user = await retrieveUser(comment.userID);

    // Store the username of the comment author in the Comment document
    comment.username = user.username;

    const dbComment = new Comment(comment);
    await dbComment.save();

    // Add the comment to the User's comments array
    await User.updateOne({ _id: comment.userID }, { $push: { comments: dbComment._id } });

    return dbComment;
}

async function retrieveCommentsByTeam(teamID) {
    return Comment.find({ teamID: teamID });
}

export { createComment, retrieveCommentsByTeam };
