import express from "express";
import passportRequestHandler from "../../auth/passportHandler";
import {
    createTeam,
    retrieveTeam,
    retrieveTeamList,
    deleteTeam,
    updateTeamUpvotes,
    updateTeamDownvotes,
} from "../../teams/team-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const router = express.Router();

// Create new team
router.post("/", passportRequestHandler, async (req, res) => {
    try {
        const newTeam = await createTeam({
            creator: req.user._id,
            teamName: req.body.teamName,
            description: req.body.description,
            upvotes: 0,
            party: req.body.party,
        });

        res.status(HTTP_CREATED).header("Location", `/api/teams/${newTeam._id}`).json(newTeam);
    } catch (error) {
        res.status(HTTP_BAD_REQUEST).send(error.message);
    }
});

// Retrieve all teams
router.get("/", async (req, res) => {
    try {
        res.json(await retrieveTeamList());
    } catch (error) {
        res.status(HTTP_INTERNAL_SERVER_ERROR).send(error.message);
    }
});

// Retrieve single team
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const team = await retrieveTeam(id);

        if (team) {
            res.json(team);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

// Delete team
router.delete("/:id", passportRequestHandler, async (req, res) => {
    try {
        const { id } = req.params;
        await deleteTeam(id);
        res.sendStatus(HTTP_NO_CONTENT);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

// Increase the team upvotes
router.patch("/:id/upvotes", passportRequestHandler, async (req, res) => {
    try {
        const { id } = req.params;
        const upvotes = req.body.upvotes;
        const userID = req.user._id;

        await updateTeamUpvotes(id, upvotes, userID);

        res.sendStatus(HTTP_NO_CONTENT);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

// Increase the team downvotes
router.patch("/:id/downvotes", passportRequestHandler, async (req, res) => {
    try {
        const { id } = req.params;
        let downvotes = req.body.downvotes;
        const userID = req.user._id;

        await updateTeamDownvotes(id, downvotes, userID);

        res.sendStatus(HTTP_NO_CONTENT);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

export default router;
