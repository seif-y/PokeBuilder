import styles from "./CommentForm.module.css";
import ShadowedBox from "../util/style-components/ShadowedBox";
import TextArea from "../../global/TextArea";
import { useState } from "react";
import Button from "../../global/Button";

export default function CommentForm({ onSubmitComment }) {
    const EMPTY = "";
    const [comment, setComment] = useState(EMPTY);
    const submitAndClear = () => {
        onSubmitComment(comment);
        setComment(EMPTY);
    };
    return (
        <ShadowedBox classes={`${styles.flex} ${styles.commentForm}`}>
            <TextArea classes={styles.form} onChange={setComment} placeholder="Speak your mind..." value={comment} />
            <Button text="Submit" onClick={submitAndClear} />
        </ShadowedBox>
    );
}
