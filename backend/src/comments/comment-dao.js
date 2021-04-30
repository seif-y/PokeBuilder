import { Comment } from "./commentSchema";

async function createComment(comment) {
    const dbComment = new Comment(comment);
    await dbComment.save();
    return dbComment;
}

async function retrieveCommentsByTeam(team) {
    await Comment.find({ teamID: team._id });
}

export { createComment, retrieveCommentsByTeam };
