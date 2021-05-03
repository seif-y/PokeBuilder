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

async function updateTeamUpVotes(id, upVotes, userID) {
    await Team.updateOne({ _id: id }, { $inc: { upVotes: upVotes } });
    await User.updateOne({ _id: userID }, { $push: { upVotedTeams: id } });
}

async function updateTeamDownVotes(id, downVotes, userID) {
    // The downvotes must decrease the upVote value of a team. Therefore, the value is a negative value is added
    downVotes = downVotes * -1;
    await Team.updateOne({ _id: id }, { $inc: { upVotes: downVotes } });
    await User.updateOne({ _id: userID }, { $push: { downVotedTeams: id } });
}

export { createTeam, retrieveTeam, retrieveTeamList, deleteTeam, updateTeamUpVotes, updateTeamDownVotes };
