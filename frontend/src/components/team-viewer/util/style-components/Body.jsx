import styles from "./Body.module.css";

export default function Body({ children, classes }) {
    return <div className={`${styles.body} ${classes}`}>{children}</div>;
}
