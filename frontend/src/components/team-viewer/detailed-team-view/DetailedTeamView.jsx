import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./DetailedTeamView.module.css";
import { getToken, getAuthConfig } from "../../../util/auth";
import { AuthContext } from "../../../App.js";
import Comment from "./Comment";
import CommentForm from "./CommentForm";
import ImmutableTeamMember from "./ImmutableTeamMember";
import Body from "../util/style-components/Body";
import ShadowedBox from "../util/style-components/ShadowedBox";
import UpvoteBox from "../util/upvotes/UpvoteBox";
import BlackHeadingTag from "../../global/BlackHeadingTag";

function Heading({ teamData: { _id: teamID, teamName, creatorUsername, upvotes }, isUpvoted, onVote }) {
    return (
        <div className={`flex ${styles.heading}`}>
            <UpvoteBox
                isUpvoted={isUpvoted}
                upvotes={upvotes}
                onVote={(newIsUpvoted) => onVote(newIsUpvoted, teamID)}
            />
            <h1>{teamName}</h1>
            <div className={styles.rightHeaderContent}>
                <span className={styles.username}>{`by ${creatorUsername}`}</span>
            </div>
        </div>
    );
}

function Party({ party = [] }) {
    return (
        <div className={styles.sixPack}>
            {party.map(({ _id, name, notes, sprite, types }) => (
                <ImmutableTeamMember key={_id} name={name} notes={notes} sprite={sprite} types={types} />
            ))}
        </div>
    );
}

function Description({ text }) {
    return (
        <ShadowedBox>
            <div className={styles.usernameWrapper}>
                <BlackHeadingTag text="Description" />
            </div>
            <Body>{text}</Body>
        </ShadowedBox>
    );
}

export default function DetailedTeamView({ teamData, isUpvoted, onVote }) {
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
            <Heading teamData={teamData} onVote={onVote} isUpvoted={isUpvoted} />
            <div className={styles.teamContainer}>
                <Party party={teamData.party} />
                <Description text={teamData.description} />
            </div>
            <div className={styles.commentsWrapper}>
                <div className={styles.headerWrapper}>
                    <BlackHeadingTag text="Comments" size={400} leftAlign />
                </div>
                <>
                    {comments.map(({ _id, comment: body, username }) => (
                        <Comment key={_id} body={body} username={username} />
                    ))}
                </>
                <CommentForm onSubmitComment={handleOnSubmitComment} />
            </div>
        </div>
    );
}
