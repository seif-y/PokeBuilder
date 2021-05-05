import axios from "axios";
import styles from "./TeamViewer.module.css";
import { useEffect, useState } from "react";
import { formatParty } from "../../pokeapi/pokemon";
import TeamView from "./TeamView";

function handleOnVote(isUpvoted, teamID) {
    const UPVOTE_ENDPOINT = `/api/teams/${teamID}/upvotes`;
    console.log(isUpvoted, teamID);
}

// todo refactor useEffect into a useFetch hook

function RenderTeamView({ _id, creatorUsername: creatorName, teamName, description, party, isUpvoted, upvotes }) {
    const [formattedParty, setFormattedParty] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const newParty = await formatParty(party);
            setFormattedParty(() => newParty);
        }
        if (party.length !== 0) {
            fetchData();
        }
    }, [party]);

    return (
        <TeamView
            key={_id}
            teamID={_id}
            creatorName={creatorName}
            teamName={teamName}
            description={description}
            party={formattedParty}
            onVote={handleOnVote}
            isUpvoted={isUpvoted}
            upvotes={upvotes}
        />
    );
}

function TeamViewList({ teamViews, upvotedTeams }) {
    return (
        <div className={styles.wrapper}>
            {teamViews.map((teamView) => {
                teamView.isUpvoted = upvotedTeams.includes(teamView._id);
                return RenderTeamView(teamView);
            })}
        </div>
    );
}

export default function TeamViewer() {
    const [teamViews, setTeamViews] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get("/api/teams");
            setTeamViews(res.data);
        }
        fetchData();
    }, []);

    const userID = "6091dee9a3277378e0a9f0b9"; // provide token instead
    const USER_ENDPOINT = `/api/users/${userID}`;
    const [upvotedTeams, setUpvotedTeams] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(USER_ENDPOINT);
            setUpvotedTeams(res?.data?.upvotedTeams);
        }
        fetchData();
    }, [USER_ENDPOINT]);

    return <TeamViewList teamViews={teamViews} upvotedTeams={upvotedTeams} />;
}
