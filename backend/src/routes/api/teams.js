import express from "express";
import {
    createTeam,
    retrieveTeam,
    retrieveTeamList,
    deleteTeam,
    updateTeamUpVotes,
    updateTeamDownVotes,
} from "../../teams/team-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const router = express.Router();

// Create new team
router.post("/", async (req, res) => {
    try {
        const newTeam = await createTeam({
            creator: req.body.creator,
            teamName: req.body.teamName,
            description: req.body.description,
            upVotes: 0,
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
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await deleteTeam(id);
        res.sendStatus(HTTP_NO_CONTENT);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

// Increase the team upvotes
router.patch("/:id/upvotes", async (req, res) => {
    try {
        const { id } = req.params;
        const upVotes = req.body.upVotes;
        const userID = req.body.userID;

        await updateTeamUpVotes(id, upVotes, userID);

        res.sendStatus(HTTP_NO_CONTENT);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

// Increase the team downvotes
router.patch("/:id/downvotes", async (req, res) => {
    try {
        const { id } = req.params;
        let downVotes = req.body.downVotes;
        const userID = req.body.userID;

        await updateTeamDownVotes(id, downVotes, userID);

        res.sendStatus(HTTP_NO_CONTENT);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid team id");
    }
});

export default router;
