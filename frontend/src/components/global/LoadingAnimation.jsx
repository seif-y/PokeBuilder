import React from "react";
import styles from "./LoadingAnimation.module.css";

export default function LoadingAnimation({size="medium"}) {
    const sizeStyles = {
        small: { width: "20px", height: "20px" },
        medium: { width: "40px", height: "40px" },
    };
    let sizeStyle;

    // Set the size of the component
    if (size && sizeStyles.hasOwnProperty(size)) {
        sizeStyle = sizeStyles[size.toLowerCase()];
    }

    return (
        <span className={styles.container}>
            <img
                className={styles.img}
                style={{...sizeStyle }}
                src={`${process.env.PUBLIC_URL}/icons/pokeball.png`}
                alt="..."
            />
        </span>

    );

}
