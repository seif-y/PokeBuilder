import { render, screen } from "@testing-library/react";
import { StaticRouter } from "react-router";
import TeamView from "../components/team-viewer/TeamView";

const team = {
    _id: "304u012h5k436h",
    creatorUsername: "TestUser",
    teamName: "Test Team",
    description: "This is not a real team. You have been deceived",
    party: [3, 6, 9, 12, 15, 17].map((id, ind) => {
        return { pokemonID: id, notes: `Team member #${ind}` };
    }),
};

describe("TeamView component", () => {
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
