import { User } from "./userSchema";
import { Team } from "../teams/teamSchema";

async function createUser(user) {
    const dbUser = new User(user);
    await dbUser.save();
    return dbUser;
}

async function retrieveUser(id) {
    return User.findById(id);
}

async function getTeamsByUser(userID) {
    return Team.find({ creator: userID });
}

async function deleteUser(id) {
    await User.deleteOne({ _id: id });
    await Team.deleteMany({ creator: id });
}

export { createUser, retrieveUser, getTeamsByUser, deleteUser };
