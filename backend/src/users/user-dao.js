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

async function updateUser(user) {
    const dbUser = await User.findById(user._id);
    if (dbUser) {
        dbUser.username = user.username;
        dbUser.password = user.password;
        dbUser.comments = user.comments;
        dbUser.upVotedTeams = user.upVotedTeams;

        await dbUser.save();
        return true;
    }

    return false;
}

async function getTeamsByUser(user) {
    const dbUser = await User.findById(user._id);
    if (dbUser) {
        await Team.find({ creator: user._id });
    }
}

async function deleteUser(id) {
    await User.deleteOne({ _id: id });
}

export { createUser, retrieveUser, updateUser, getTeamsByUser, deleteUser };
