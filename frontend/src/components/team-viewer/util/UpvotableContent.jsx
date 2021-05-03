import UpvoteBox from "./UpvoteBox";
import "../../../index.css"; // .flex {display: flex}
import styles from "./UpvotableContent.module.css";

export default function UpvotableContent({ upvotes, children }) {
    return (
        <div className={`flex ${styles.upvotableContent}`}>
            <UpvoteBox upvotes={upvotes} />
            <div className={styles.content}>{children}</div>
        </div>
    );
}
