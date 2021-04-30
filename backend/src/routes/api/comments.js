import express from "express";
import { createComment, retrieveCommentsByTeam } from "../../comments/comment-dao";
import { retrieveTeam } from "../../teams/team-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;

const router = express.Router();

// Create new comment
router.post("/:id/comments", async (req, res) => {
    const { id } = req.params;

    const newComment = await createComment({
        comment: req.body.comment,
        teamID: id,
    });

    res.status(HTTP_CREATED).header("Location", `/team/${id}/comments/${newComment._id}`).json(newComment);
});

// Retrieve comments by team
router.get("/:id/comments", async (req, res) => {
    const { id } = req.params;

    const team = await retrieveTeam(id);
    const comments = retrieveCommentsByTeam(team);

    if (comments) {
        res.json(comments);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

export default router;
