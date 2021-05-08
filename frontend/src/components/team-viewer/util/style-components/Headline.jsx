import styles from "./Headline.module.css";

export default function Headline({ children, classes }) {
    return <div className={`${styles.headline} ${classes}`}>{children}</div>;
}
