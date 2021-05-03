import express from "express";

const router = express.Router();

import comments from "./comments";
router.use("/teams", comments);

import teams from "./teams";
router.use("/teams", teams);

import users from "./users";
router.use("/users", users);

export default router;
