import Body from "../util/style-components/Body";
import ShadowedBox from "../util/style-components/ShadowedBox";
import BlackHeadingTag from "../../global/BlackHeadingTag";
import styles from "./Comment.module.css";

export default function Comment({ body, username }) {
    return (
        <ShadowedBox>
            <div className={styles.usernameWrapper}>
                <BlackHeadingTag text={username} leftAlign />
            </div>
            <Body>{body}</Body>
        </ShadowedBox>
    );
}
