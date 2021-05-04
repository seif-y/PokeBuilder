import styles from "./CommentForm.module.css";
import ShadowedBox from "../util/style-components/ShadowedBox";
import TextArea from "../../global/TextArea";
import { useState } from "react";

export default function CommentForm({ onSubmitComment }) {
    const EMPTY = "";
    const [comment, setComment] = useState(EMPTY);
    const submitAndClear = () => {
        setComment((currentComment) => {
            onSubmitComment(currentComment);
            return EMPTY;
        });
    };
    return (
        <ShadowedBox classes={`${styles.flex} ${styles.commentForm}`}>
            <TextArea classes={styles.form} onChange={setComment} placeholder="Speak your mind..." value={comment} />
            <button className={styles.submitButton} onClick={submitAndClear}>
                SUBMIT
            </button>
        </ShadowedBox>
    );
}
