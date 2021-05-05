import { Team } from "./teamSchema";
import { User } from "../users/userSchema";

const NUM_OF_UPVOTES_PER_USER = 1;

async function createTeam(team) {
    const dbTeam = new Team(team);
    await dbTeam.save();
    return dbTeam;
}

async function retrieveTeamList() {
    return Team.find();
}

async function retrieveTeam(id) {
    return Team.findById(id);
}

async function deleteTeam(id) {
    await Team.deleteOne({ _id: id });
}

async function updateTeamUpvotes(id, increment, userID) {
    let upvotes = NUM_OF_UPVOTES_PER_USER;

    if (increment) {
        await User.updateOne({ _id: userID }, { $addToSet: { upvotedTeams: id } });
    } else {
        // Decrement the upvotes
        upvotes = upvotes * -1;

        await User.updateOne({ _id: userID }, { $pullAll: { upvotedTeams: [id] } });
    }

    await Team.updateOne({ _id: id }, { $inc: { upvotes: upvotes } });
}

export { createTeam, retrieveTeam, retrieveTeamList, deleteTeam, updateTeamUpvotes };
