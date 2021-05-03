import UpvotableContent from "./util/UpvotableContent";
import styles from "./TeamView.module.css";

function Details({ creator, teamName, description }) {
    const CHAR_LIMIT = 400;
    return (
        <div>
            <div className={`flex ${styles.headline}`}>
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

export default function TeamView({ creator, teamName, description, party, upvotes }) {
    return (
        <UpvotableContent upvotes={upvotes}>
            <Details creator={creator} teamName={teamName} description={description} />
            <PartySprites party={party} />
        </UpvotableContent>
    );
}
