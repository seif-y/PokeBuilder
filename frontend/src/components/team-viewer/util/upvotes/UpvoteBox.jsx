import styles from "./UpvoteBox.module.css";
import { Forward as Arrow } from "@material-ui/icons";

function truncateVote(number) {
    // Always round down to 1dp unless that dp is 0
    const format = `${Math.floor((number * 10) / 1000) / 10}k`;
    return number < 1000 ? number : format;
}

// todo add upvote downvote functionality
// perhaps an onVote function prop

export default function UpvoteBox({ upvotes }) {
    return (
        <div className={`flex ${styles.upvoteBox}`}>
            <Arrow fontSize="large" className={`${styles.arrow} ${styles.clickable}`} />
            {truncateVote(upvotes)}
            <Arrow fontSize="large" className={`${styles.arrow} ${styles.reversed} ${styles.clickable}`} />
        </div>
    );
}
