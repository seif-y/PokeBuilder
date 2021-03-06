import Body from "./util/style-components/Body";
import Headline from "./util/style-components/Headline";
import UpvotableContent from "./util/upvotes/UpvotableContent";
import { Link } from "react-router-dom";
import styles from "./TeamView.module.css";
import BlackHeadingTag from "../global/BlackHeadingTag";

function Details({ creatorUsername, teamName, description }) {
    const CHAR_LIMIT = 150;
    return (
        <>
            <Headline classes={`flex ${styles.title}`}>
                <BlackHeadingTag text={teamName} size={300} leftAlign />
                <span className={styles.creator}>{`by ${creatorUsername}`}</span>
            </Headline>
            <Body>{description.length < CHAR_LIMIT ? description : `${description.slice(0, CHAR_LIMIT)}...`}</Body>
        </>
    );
}

function PartySprites({ party }) {
    return (
        <div>
            {party.map(({ pokemonID, name, sprite }, index) => (
                <img
                    key={index}
                    className={styles.partySprite}
                    src={sprite}
                    title={`${name} #${pokemonID}`}
                    alt={`#${pokemonID}`}
                />
            ))}
        </div>
    );
}

export default function TeamView({
    teamData: { _id: teamID, creatorUsername, teamName, description, party },
    onVote,
    isUpvoted,
    upvotes,
}) {
    return (
        <UpvotableContent
            classes={styles.clickable}
            isUpvoted={isUpvoted}
            onVote={(isUpvoted) => onVote(isUpvoted, teamID)}
            upvotes={upvotes}
        >
            <Link className={styles.link} to={`/teams/${teamID}`}>
                <Details creatorUsername={creatorUsername} teamName={teamName} description={description} />
                <PartySprites party={party} />
            </Link>
        </UpvotableContent>
    );
}
