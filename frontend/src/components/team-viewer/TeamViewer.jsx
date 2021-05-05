import axios from "axios";
import styles from "./TeamViewer.module.css";
import { useEffect, useState } from "react";
import { formatParty } from "../../pokeapi/pokemon";
import TeamView from "./TeamView";

// todo refactor useEffect into a useFetch hook

function RenderTeamView({ _id, creatorUsername: creatorName, teamName, description, party, upvotes }) {
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
            upvotes={upvotes}
        />
    );
}

function TeamViewList({ teamViews }) {
    return <div className={styles.wrapper}>{teamViews.map(RenderTeamView)}</div>;
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
    return <TeamViewList teamViews={teamViews} />;
}
