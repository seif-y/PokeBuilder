import styles from "./TeamViewer.module.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { getToken, getAuthConfig, getUserID } from "../../util/auth";
import { AuthContext } from "../../App.js";
import DetailedTeamView from "./detailed-team-view/DetailedTeamView";
import TeamView from "./TeamView";
import NOT_FOUND from "../global/NOT_FOUND";

// todo refactor useEffect into a useFetch hook

export default function TeamViewer() {
    const [loggedIn] = useContext(AuthContext);

    /* Most of the data that's needed to render a TeamView component is fetched here */
    const [teamViews, setTeamViews] = useState([]);
    async function fetchAndSetTeamViews() {
        const res = await axios.get("/api/teams");
        setTeamViews(res.data);
    }
    useEffect(() => {
        fetchAndSetTeamViews();
    }, [loggedIn]);

    /* We highlight upvotes by detecting whether a teamID is included in upvotedTeams */
    const [upvotedTeams, setUpvotedTeams] = useState([]);
    async function fetchAndSetUpvotedTeams(token) {
        const userID = getUserID(token);
        const USER_ENDPOINT = `/api/users/${userID}`;
        const res = await axios.get(USER_ENDPOINT, getAuthConfig(token));
        setUpvotedTeams(res.data.upvotedTeams);
    }
    useEffect(() => {
        if (loggedIn) {
            const token = getToken();
            fetchAndSetUpvotedTeams(token);
        } else {
            setUpvotedTeams([]);
        }
    }, [loggedIn]);

    async function handleOnVote(isUpvoted, teamID) {
        const UPVOTE_ENDPOINT = `/api/teams/${teamID}/upvotes`;
        const token = getToken();
        if (token) {
            const body = { increment: isUpvoted };
            await axios.patch(UPVOTE_ENDPOINT, body, getAuthConfig(token));
            fetchAndSetUpvotedTeams(token); // renders the highlights
            fetchAndSetTeamViews(); // gets the upvotes fresh from the server
        }
    }

    function IdentifyTeamView() {
        const { id: teamID } = useParams();

        if (teamViews.length === 0) {
            return null;
        }

        const index = teamViews.findIndex(({ _id }) => _id === teamID);
        if (index === -1) {
            return <NOT_FOUND />;
        }

        return (
            <DetailedTeamView
                teamData={teamViews[index]}
                onVote={handleOnVote}
                isUpvoted={upvotedTeams.includes(teamID)}
                upvotes={teamViews[index].upvotes}
            />
        );
    }

    return (
        // <Router>
        <Switch>
            <Route path="/teams/:id">
                <IdentifyTeamView />
            </Route>
            <Route>
                <div className={styles.wrapper}>
                    {teamViews.map((teamView) => (
                        <TeamView
                            key={teamView._id}
                            teamData={teamView}
                            onVote={handleOnVote}
                            isUpvoted={upvotedTeams.includes(teamView._id)}
                            upvotes={teamView.upvotes}
                        />
                    ))}
                </div>
            </Route>
        </Switch>
    );
}
