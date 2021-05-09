import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./DetailedTeamView.module.css";
import { getToken, getAuthConfig, getUserID } from "../../../util/auth";
import { AuthContext } from "../../../App.js";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import ImmutableTeamMember from "./ImmutableTeamMember";
import Body from "../util/style-components/Body";
import Headline from "../util/style-components/Headline";
import ShadowedBox from "../util/style-components/ShadowedBox";
import UpvoteBox from "../util/upvotes/UpvoteBox";
import { PokemonDataContext } from "../../../pokeapi/PokemonDataContextProvider";

function Heading({ loggedIn, teamData: { _id: teamID, teamName, creatorUsername, upvotes: initialUpvotes } }) {
    /* TODO duplicate code from TeamViewer */
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
        }
    }, [loggedIn]);

    // todo ask backend for a GET upvotes only endpoint?
    const [upvoteCount, setUpvoteCount] = useState(initialUpvotes);

    async function fetchAndSetUpvoteCount() {
        const TEAM_ENDPOINT = `/api/teams/${teamID}`;
        const res = await axios.get(TEAM_ENDPOINT);
        setUpvoteCount(res.data.upvotes);
    }

    async function handleOnVote(isUpvoted) {
        if (loggedIn) {
            const UPVOTE_ENDPOINT = `/api/teams/${teamID}/upvotes`;
            const token = getToken();
            const body = { increment: isUpvoted };
            await axios.patch(UPVOTE_ENDPOINT, body, getAuthConfig(token));
            fetchAndSetUpvotedTeams(token); // renders the highlights
            fetchAndSetUpvoteCount(); // renders the new count
        }
    }

    return (
        <div className={`flex ${styles.heading}`}>
            <UpvoteBox
                isUpvoted={loggedIn && upvotedTeams.includes(teamID)}
                upvotes={upvoteCount}
                onVote={handleOnVote}
            />
            <h1>{`${teamName} by ${creatorUsername}`}</h1>
        </div>
    );
}

function Party({ party = [] }) {
    const allPokemonViews = useContext(PokemonDataContext);
    const [formattedParty, setFormattedParty] = useState([]);

    // TODO: duplicate code from TeamView
    useEffect(() => {
        if (allPokemonViews) {
            setFormattedParty(
                party.map((pokemon) => {
                    const pokemonView = allPokemonViews.find((element) => element.id === pokemon.pokemonID);
                    return Object.assign({}, pokemon, pokemonView);
                })
            );
        }
    }, [party, allPokemonViews]);
    return (
        <div className={styles.sixPack}>
            {formattedParty.map(({ _id, name, notes, sprite, types }) => (
                <ImmutableTeamMember key={_id} name={name} notes={notes} sprite={sprite} types={types} />
            ))}
        </div>
    );
}

function Description({ text }) {
    return (
        <ShadowedBox>
            <Headline>Description</Headline>
            <Body>{text}</Body>
        </ShadowedBox>
    );
}

export default function Render({ teamData }) {
    return teamData ? <DetailedTeamView teamData={teamData} /> : null;
}

function DetailedTeamView({ teamData }) {
    const [loggedIn] = useContext(AuthContext);

    const COMMENTS_ENDPOINT = `/api/teams/${teamData._id}/comments`;
    const [comments, setComments] = useState([]);
    const renderComments = useCallback(async () => {
        const res = await axios.get(COMMENTS_ENDPOINT);
        setComments(res.data);
    }, [COMMENTS_ENDPOINT]);

    useEffect(() => {
        renderComments();
    }, [COMMENTS_ENDPOINT, renderComments]);

    const handleOnSubmitComment = async (comment) => {
        if (comment && loggedIn) {
            const token = getToken();
            await axios.post(COMMENTS_ENDPOINT, { comment }, getAuthConfig(token));
            renderComments();
        }
    };

    return (
        <div className={styles.wrapper}>
            <Heading loggedIn={loggedIn} teamData={teamData} />
            <Party party={teamData.party} />
            <Description text={teamData.description} />
            <CommentForm onSubmitComment={handleOnSubmitComment} />
            <>
                {comments.map(({ _id, comment: body, username }) => (
                    <Comment key={_id} body={body} username={username} />
                ))}
            </>
        </div>
    );
}
