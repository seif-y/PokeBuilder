import { Team } from "./teamSchema";
import { User } from "../users/userSchema";

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

async function updateTeamUpvotes(id, upvotes, userID) {
    await Team.updateOne({ _id: id }, { $inc: { upvotes: upvotes } });
    await User.updateOne({ _id: userID }, { $push: { upvotedTeams: id } });
}

async function updateTeamDownvotes(id, downvotes, userID) {
    // The downvotes must decrease the upvote value of a team. Therefore, the value is a negative value is added
    downvotes = downvotes * -1;
    await Team.updateOne({ _id: id }, { $inc: { upvotes: downvotes } });
    await User.updateOne({ _id: userID }, { $push: { downvotedTeams: id } });
}

export { createTeam, retrieveTeam, retrieveTeamList, deleteTeam, updateTeamUpvotes, updateTeamDownvotes };
