import Body from "./util/Body";
import Headline from "./util/Headline";
import UpvotableContent from "./util/UpvotableContent";
import styles from "./TeamView.module.css";

function Details({ creator, teamName, description }) {
    const CHAR_LIMIT = 400;
    return (
        <>
            <Headline classes={`flex ${styles.tytle}`}>
                <span>{teamName}</span>
                <span>{`creator: ${creator}`}</span>
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

export default function TeamView({ creator, teamName, description, party, upvotes }) {
    return (
        <UpvotableContent upvotes={upvotes}>
            <Details creator={creator} teamName={teamName} description={description} />
            <PartySprites party={party} />
        </UpvotableContent>
    );
}
