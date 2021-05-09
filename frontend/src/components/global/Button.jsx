import React from "react";
import styles from "./Button.module.css";

export default function Button({ text, onClick, color = "black" }) {
    const classNames = {
        black: "black",
        white: "white",
    };

    const className = classNames.hasOwnProperty(color) ? classNames[color] : "black";

    return (
        <div className={`${styles.button} ${styles[className]}`} onClick={onClick}>
            {text}
        </div>
    );
}
