import express from "express";
import { createUser, retrieveUser, getTeamsByUser, deleteUser, getJwtForUser } from "../../users/user-dao";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;
const HTTP_INTERNAL_SERVER_ERROR = 500;

const DUPLICATE_USERNAME_ERROR_CODE = 11000;

const router = express.Router();

// Create new user
router.post("/register", async (req, res) => {
    await createUser(
        {
            username: req.body.username,
            password: req.body.password,
            comments: [],
            upVotedTeams: [],
            downVotedTeams: [],
        },
        (newUser, error) => {
            if (error) {
                switch (error.code) {
                    case DUPLICATE_USERNAME_ERROR_CODE:
                        res.status(HTTP_BAD_REQUEST).send(
                            "The username is already taken. Please choose a different username."
                        );

                    default:
                        res.status(HTTP_INTERNAL_SERVER_ERROR).send(error.message);
                }
            }

            res.status(HTTP_CREATED).header("Location", `/api/users/${newUser._id}`).json(newUser);
        }
    );
});

router.post("/login", async (req, res) => {
    try {
        getJwtForUser(req.body.username, req.body.password, (body) => {
            if (body.success) {
                res.status(201).send(body);
            } else {
                res.status(400).send(body);
            }
        });
    } catch (error) {
        res.status(500).send(error);
    }
});

// Retrieve single user
router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const user = await retrieveUser(id);

        if (user) {
            res.json(user);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid user id");
    }
});

// Retrieve the teams created by a user
router.get("/:id/teams", async (req, res) => {
    const { id } = req.params;

    try {
        const teams = await getTeamsByUser(id);

        if (teams) {
            res.json(teams);
        } else {
            res.sendStatus(HTTP_NOT_FOUND);
        }
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid user id");
    }
});

// Delete user
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await deleteUser(id);
        res.sendStatus(HTTP_NO_CONTENT);
    } catch {
        res.status(HTTP_BAD_REQUEST).send("Invalid user id");
    }
});

export default router;
