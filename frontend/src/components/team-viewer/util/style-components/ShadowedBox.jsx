import styles from "./ShadowedBox.module.css";

export default function ShadowedBox({ children, classes }) {
    return <div className={`${styles.shadowedBox} ${classes}`}>{children}</div>;
}
