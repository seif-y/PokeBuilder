import { Team } from "./teamSchema";

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

async function updateTeam(team) {
    const dbTeam = await Team.findById(team._id);
    if (dbTeam) {
        dbTeam.creator = team.creator;
        dbTeam.teamName = team.teamName;
        dbTeam.description = team.description;
        dbTeam.upVotes = team.upVotes;
        dbTeam.party = team.party;

        await dbTeam.save();
        return true;
    }

    return false;
}

async function deleteTeam(id) {
    await Team.deleteOne({ _id: id });
}

export { createTeam, retrieveTeam, retrieveTeamList, updateTeam, deleteTeam };
