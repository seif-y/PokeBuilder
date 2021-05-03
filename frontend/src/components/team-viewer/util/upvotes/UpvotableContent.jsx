import UpvoteBox from "./UpvoteBox";
import ShadowedBox from "../style-components/ShadowedBox";
import styles from "./UpvotableContent.module.css";

export default function UpvotableContent({ upvotes, children }) {
    return (
        <ShadowedBox classes={styles.flex}>
            <UpvoteBox upvotes={upvotes} />
            <div className={styles.content}>{children}</div>
        </ShadowedBox>
    );
}
