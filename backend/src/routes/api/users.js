import express from "express";
import { createUser, retrieveUser, getTeamsByUser, deleteUser } from "../../users/user-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// Create new user
router.post("/", async (req, res) => {
    const newUser = await createUser({
        username: req.body.username,
        password: req.body.password,
        comments: req.body.comments,
        upVotedTeams: req.body.upVotedTeams,
    });

    res.status(HTTP_CREATED).header("Location", `/user/${newUser._id}`).json(newUser);
});

// Retrieve single user
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const user = await retrieveUser(id);
    const teams = await getTeamsByUser(user);

    if (teams) {
        res.json(user);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

// Retrieve the teams created by a user
router.get("/:id/teams", async (req, res) => {
    const { id } = req.params;

    const user = await retrieveUser(id);
    const teams = await getTeamsByUser(user);

    if (user) {
        res.json(teams);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await deleteUser(id);
    res.sendStatus(HTTP_NO_CONTENT);
});

export default router;
