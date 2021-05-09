import styles from "./NOT_FOUND.module.css";

export default function NOT_FOUND() {
    return (
        <div className={styles.notFound}>
            <img className={styles.notFoundImage} src="/images/missingno.gif" alt="MissingNo." />
            <h3>The page you're looking for was not found.</h3>
        </div>
    );
}
