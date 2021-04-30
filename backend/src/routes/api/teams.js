import express from "express";
import { createTeam, retrieveTeam, retrieveTeamList, updateTeam, deleteTeam } from "../../teams/team-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;

const router = express.Router();

// Create new team
router.post("/teams", async (req, res) => {
    const newTeam = await createTeam({
        creator: req.body.creator,
        teamName: req.body.teamName,
        description: req.body.description,
        upVotes: req.body.upVotes,
        party: req.body.party,
    });

    res.status(HTTP_CREATED).header("Location", `/team/${newTeam._id}`).json(newTeam);
});

// Retrieve all teams
router.get("/", async (req, res) => {
    res.json(await retrieveTeamList());
});

// Retrieve single team
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    const team = await retrieveTeam(id);

    if (team) {
        res.json(team);
    } else {
        res.sendStatus(HTTP_NOT_FOUND);
    }
});

// Update team
router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const team = req.body;
    team._id = id;
    const success = await updateTeam(team);
    res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

// Delete team
router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    await deleteTeam(id);
    res.sendStatus(HTTP_NO_CONTENT);
});

export default router;
