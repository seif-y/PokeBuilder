import React from "react";
import styles from "./SideNavbar.module.css";

export default function NavbarIcon({ imageName, altText }) {
    return (
        <div className={styles.navbarIconContainer}>
            <img
                className={`${styles.navbarIconImage} ${styles.unselectable}`}
                src={`${process.env.PUBLIC_URL}/icons/${imageName}`}
                alt={altText}
            />
        </div>
    );
}
