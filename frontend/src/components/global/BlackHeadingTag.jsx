import React from "react";
import styles from "./BlackHeadingTag.module.css";

export default function BlackHeadingTag({text, size=140}) {
    const sizeStyle = { width: size};

    return <div className={styles.header} style={{...sizeStyle }}>{text}</div>
}
