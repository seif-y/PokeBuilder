import express from "express";
import comments from "./comments";
import teams from "./teams";
import users from "./users";

const router = express.Router();

router.use("/teams", comments);

router.use("/teams", teams);

router.use("/users", users);

export default router;
