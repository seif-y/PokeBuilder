import axios from "axios";
import styles from "./TeamViewer.module.css";
import { useEffect, useState } from "react";
import { getPokemonView } from "../../pokeapi/pokemon";
import TeamView from "./TeamView";

// todo refactor useEffect into a useFetch hook
// todo pass more info here so that it's easier to transition to DetailedTeamView
const formatParty = async (party) => {
    return Promise.all(
        party.map(async ({ pokemonID }) => {
            const { name, sprite } = await getPokemonView(pokemonID);
            return {
                name,
                pokemonID,
                sprite,
            };
        })
    );
};

function RenderTeamView({ _id, creator, teamName, description, party, upVotes: upvotes }) {
    const [formattedParty, setFormattedParty] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const newParty = await formatParty(party);
            setFormattedParty(() => newParty);
        }
        fetchData();
    }, [party]);

    return (
        <TeamView
            key={_id}
            creator={creator}
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
            const res = await axios.get("api/teams");
            setTeamViews(() => res.data);
        }
        fetchData();
    }, []);
    return <TeamViewList teamViews={teamViews} />;
}
