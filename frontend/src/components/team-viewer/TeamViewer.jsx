import axios from "axios";
import jwt_decode from "jwt-decode";
import styles from "./TeamViewer.module.css";
import { AuthContext } from "../../App.js";
import { useContext, useEffect, useState } from "react";
import TeamView from "./TeamView";

const getToken = () => localStorage.getItem("pokebuilderAuthToken");

const getAuthConfig = (token) => ({
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

const getUserID = (token) => {
    let userID = "";
    try {
        userID = jwt_decode(token).id;
    } catch {}
    return userID;
};

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

    return (
        <div className={styles.wrapper}>
            {teamViews.map((teamView) => (
                <TeamView
                    key={teamView._id}
                    teamID={teamView._id}
                    creatorName={teamView.creatorUsername}
                    teamName={teamView.teamName}
                    description={teamView.description}
                    party={teamView.party}
                    onVote={handleOnVote}
                    isUpvoted={upvotedTeams.includes(teamView._id)}
                    upvotes={teamView.upvotes}
                />
            ))}
        </div>
    );
}
