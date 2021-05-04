import express from "express";
import { createComment, retrieveCommentsByTeam } from "../../comments/comment-dao";
import passportRequestHandler from "../../auth/passportHandler";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

// Create new comment
router.post("/:id/comments", passportRequestHandler, async (req, res) => {
    try {
        const { id } = req.params;

        const newComment = await createComment({
            comment: req.body.comment,
            userID: req.body.userID,
            teamID: id,
            username: "",
        });

        res.status(HTTP_CREATED).header("Location", `/api/teams/${id}/comments/${newComment._id}`).json(newComment);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

// Retrieve comments by team
router.get("/:id/comments", async (req, res) => {
    try {
        const { id } = req.params;

        const comments = await retrieveCommentsByTeam(id);

        if (comments) {
            res.json(comments);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

export default router;
