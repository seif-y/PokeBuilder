import styles from "./UpvoteBox.module.css";
import { Forward as Arrow } from "@material-ui/icons";

function truncateVote(number) {
    // Always round down to 1dp unless that dp is 0
    const format = `${Math.floor((number * 10) / 1000) / 10}k`;
    return number < 1000 ? number : format;
}

export default function UpvoteBox({ isUpvoted, upvotes = 0, onVote = () => {} }) {
    function handleOnClick() {
        onVote(!isUpvoted);
    }

    return (
        <div className={`flex ${styles.upvoteBox}`}>
            <Arrow
                fontSize="large"
                className={`${isUpvoted ? styles.upvotedColor : ""} ${styles.arrow} ${styles.clickable}`}
                onClick={handleOnClick}
            />
            {truncateVote(upvotes)}
        </div>
    );
}
