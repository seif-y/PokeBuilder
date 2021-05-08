import { render, screen } from "@testing-library/react";
import { StaticRouter } from "react-router";
import TeamView from "../components/team-viewer/TeamView";
import DetailedTeamView from "../components/team-viewer/detailed-team-view/DetailedTeamView";
import { AuthContext } from "../App";

const team = {
    _id: "304u012h5k436h",
    creatorUsername: "TestUser",
    teamName: "Test Team",
    description: "This is not a real team. You have been deceived",
    party: [3, 6, 9, 12, 15, 18].map((id, ind) => {
        return { pokemonID: id, notes: `Team member #${ind}` };
    }),
};

describe("Short TeamView component tests", () => {
    beforeEach(() => {
        render(
            <StaticRouter>
                <TeamView teamData={team} />
            </StaticRouter>
        );
    });

    test("Team title is displayed", () => {
        const teamName = screen.getByText(team.teamName);
        expect(teamName).toBeDefined();
    });

    test("Creator username is displayed", () => {
        const creatorName = screen.getByText(`creator: ${team.creatorUsername}`);
        expect(creatorName).toBeDefined();
    });
});

describe("DetailedTeamView component tests", () => {
    beforeEach(() => {
        render(
            <>
                <AuthContext.Provider value={[false, () => {}]}>
                    <DetailedTeamView teamData={team} />
                </AuthContext.Provider>
            </>
        );
    });

    test("Team name and creator name are displayed", () => {
        const teamTitle = screen.getByText(`${team.teamName} by ${team.creatorUsername}`);
        expect(teamTitle).toBeDefined();
    });

    test("Full description is included", () => {
        const descriptionField = screen.getByText(team.description);
        expect(descriptionField).toBeDefined();
    });
});
