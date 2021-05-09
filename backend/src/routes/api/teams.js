import express from "express";
import passportRequestHandler from "../../auth/passportHandler";
import { createTeam, retrieveTeam, retrieveTeamList, updateTeamUpvotes } from "../../teams/team-dao";

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
            creatorUsername: req.user.username,
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

// Increase the team upvotes
router.patch("/:id/upvotes", passportRequestHandler, async (req, res) => {
    try {
        const { id } = req.params;
        const increment = req.body.increment;
        const userID = req.user._id;

        await updateTeamUpvotes(id, increment, userID);

        res.sendStatus(HTTP_NO_CONTENT);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

export default router;
