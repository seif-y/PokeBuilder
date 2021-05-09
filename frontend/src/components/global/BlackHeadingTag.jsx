import React from "react";
import styles from "./BlackHeadingTag.module.css";

export default function BlackHeadingTag({ text, leftAlign, size = 140 }) {
    const sizeStyle = { width: size };
    const leftStyle = leftAlign ? { textAlign: "left", paddingLeft: 10 } : null;

    return (
        <div className={styles.header} style={{ ...sizeStyle, ...leftStyle }}>
            {text}
        </div>
    );
}
