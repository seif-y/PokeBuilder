import UpvoteBox from "./UpvoteBox";
import ShadowedBox from "../style-components/ShadowedBox";
import styles from "./UpvotableContent.module.css";

export default function UpvotableContent({ isUpvoted, onVote, upvotes, children, classes }) {
    return (
        <ShadowedBox classes={styles.flex}>
            <UpvoteBox isUpvoted={isUpvoted} onVote={onVote} upvotes={upvotes} />
            <div className={`${styles.content} ${classes}`}>{children}</div>
        </ShadowedBox>
    );
}
