import { StaticRouter } from "react-router";
import TeamView from "../../components/team-viewer/TeamView";
import renderer from "react-test-renderer";

const team = {
    _id: "304u012h5k436h",
    creatorUsername: "TestUser",
    teamName: "Test Team",
    description: "This is not a real team. You have been deceived",
    party: [3, 6, 9, 12, 15, 18].map((id, ind) => {
        return { pokemonID: id, notes: `Team member #${ind}` };
    }),
};

test("TeamView snapshot for test pokemon matches", () => {
    const tree = renderer
        .create(
            <StaticRouter>
                <TeamView teamData={team} />
            </StaticRouter>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
