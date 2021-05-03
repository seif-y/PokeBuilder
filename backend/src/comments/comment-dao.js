import { Comment } from "./commentSchema";

async function createComment(comment) {
    const dbComment = new Comment(comment);
    await dbComment.save();
    return dbComment;
}

async function retrieveCommentsByTeam(teamID) {
    return Comment.find({ teamID: teamID });
}

export { createComment, retrieveCommentsByTeam };
