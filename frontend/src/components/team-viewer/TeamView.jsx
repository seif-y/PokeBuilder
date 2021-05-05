import Body from "./util/style-components/Body";
import Headline from "./util/style-components/Headline";
import UpvotableContent from "./util/upvotes/UpvotableContent";
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

export default function TeamView({ teamID, creatorName, teamName, description, party, upvotes }) {
    return (
        <Link className={styles.link} to={`/teams/${teamID}`}>
            <UpvotableContent classes={styles.clickable} upvotes={upvotes}>
                <Details creatorName={creatorName} teamName={teamName} description={description} />
                <PartySprites party={party} />
            </UpvotableContent>
        </Link>
    );
}
