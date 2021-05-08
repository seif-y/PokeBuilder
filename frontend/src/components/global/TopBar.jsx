import styles from "./TopBar.module.css";
import React from "react";

export default function TopBar({ title, children }) {
    return (
        <div className={styles.topBar}>
            <span className={styles.title}>{title}</span>
            {children}
        </div>
    );
}
