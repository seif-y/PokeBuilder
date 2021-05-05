import axios from "axios";
import { formatParty } from "../../../pokeapi/pokemon";
import { useCallback, useEffect, useState } from "react";
import styles from "./DetailedTeamView.module.css";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import ImmutableTeamMember from "./ImmutableTeamMember";

function TeamTitle({ title, author }) {
    return <h1>{title && author ? `${title} by ${author}` : "Loading..."}</h1>;
}

function Party({ party = [] }) {
    const [formattedParty, setFormattedParty] = useState([]);
    // todo duplicate code from TeamViewer.jsx
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
        <div className={styles.sixPack}>
            {formattedParty.map(({ _id, name, notes, sprite, types }) => (
                <ImmutableTeamMember key={_id} name={name} notes={notes} sprite={sprite} types={types} />
            ))}
        </div>
    );
}

export default function DetailedTeamView({ teamData }) {
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
        if (comment) {
            await axios.post(COMMENTS_ENDPOINT, {
                comment,
                userID: "608f7a9b7f6606341c5fc4d8", // todo get this working
            });
            renderComments();
        }
    };

    return (
        <div className={styles.wrapper}>
            <TeamTitle title={teamData.teamName} author={teamData.creatorUsername} />
            <Party party={teamData.party} />
            <CommentForm onSubmitComment={handleOnSubmitComment} />
            <>
                {comments.map(({ _id, comment: body, username }) => (
                    <Comment key={_id} body={body} username={username} />
                ))}
            </>
        </div>
    );
}
