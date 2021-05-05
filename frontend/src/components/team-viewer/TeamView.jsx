import Body from "./util/style-components/Body";
import Headline from "./util/style-components/Headline";
import UpvotableContent from "./util/upvotes/UpvotableContent";
import { formatParty } from "../../pokeapi/pokemon";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./TeamView.module.css";

function Details({ creatorName, teamName, description }) {
    const CHAR_LIMIT = 400;
    return (
        <>
            <Headline classes={`flex ${styles.title}`}>
                <span>{teamName}</span>
                <span>{`creator: ${creatorName}`}</span>
            </Headline>
            <Body>{description < CHAR_LIMIT ? description : `${description.slice(0, CHAR_LIMIT)}...`}</Body>
        </>
    );
}

function PartySprites({ party }) {
    return (
        <div>
            {party.map(({ pokemonID, name, sprite }) => (
                <img
                    key={pokemonID}
                    className={styles.partySprite}
                    src={sprite}
                    title={`${name} #${pokemonID}`}
                    alt={`#${pokemonID}`}
                />
            ))}
        </div>
    );
}

export default function TeamView({ teamID, creatorName, teamName, description, party, onVote, isUpvoted, upvotes }) {
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
        <UpvotableContent
            classes={styles.clickable}
            isUpvoted={isUpvoted}
            onVote={(isUpvoted) => onVote(isUpvoted, teamID)}
            upvotes={upvotes}
        >
            <Link className={styles.link} to={`/teams/${teamID}`}>
                <Details creatorName={creatorName} teamName={teamName} description={description} />
                <PartySprites party={formattedParty} />
            </Link>
        </UpvotableContent>
    );
}
