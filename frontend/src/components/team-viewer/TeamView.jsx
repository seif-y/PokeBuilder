import { Forward as Arrow } from "@material-ui/icons";
import styles from "./TeamView.module.css";

function UpvoteBox({ upvotes }) {
    const truncate = (number) => {
        // Always round down to 1dp unless that dp is 0
        const format = `${Math.floor((number * 10) / 1000) / 10}k`;
        return number < 1000 ? number : format;
    };
    return (
        <div className={`${styles.flex} ${styles.upvoteBox}`}>
            <Arrow fontSize="large" className={styles.clickable} />
            {truncate(upvotes)}
            <Arrow fontSize="large" className={`${styles.reversed} ${styles.clickable}`} />
        </div>
    );
}

function Details({ creator, teamName, description }) {
    const CHAR_LIMIT = 400;
    return (
        <div className={styles.details}>
            <div className={`${styles.flex} ${styles.headline}`}>
                <span>{teamName}</span>
                <span>{`creator: ${creator}`}</span>
            </div>
            <div className={styles.description}>
                {description < CHAR_LIMIT ? description : `${description.slice(0, CHAR_LIMIT)}...`}
            </div>
        </div>
    );
}

function PartySprites({ party }) {
    return (
        <div className={styles.flex}>
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

// todo refacotr
// todo add upvote downvote functionality

export default function TeamView({ creator, teamName, description, party, upvotes }) {
    return (
        <div className={`${styles.flex} ${styles.teamView}`}>
            <UpvoteBox upvotes={upvotes} />
            <div className={styles.preview}>
                <Details creator={creator} teamName={teamName} description={description} />
                <PartySprites party={party} />
            </div>
        </div>
    );
}
