import { AuthContext } from "../../App";
import DetailedTeamView from "../../components/team-viewer/detailed-team-view/DetailedTeamView";
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

test("DetailedTeamView snapshot for test pokemon matches", () => {
    const tree = renderer
        .create(
            <AuthContext.Provider value={[false, () => {}]}>
                <DetailedTeamView teamData={team} />
            </AuthContext.Provider>
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
