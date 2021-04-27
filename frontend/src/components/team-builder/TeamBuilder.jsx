import React from "react";
import TeamMember from "./TeamMember";
import styles from "./TeamBuilder.module.css";

export default function TeamBuilder() {
    return (
        <div id="modal-root" className={styles.teamBuilderContainer}>
            <h1> Team Builder </h1>
            <div className={styles.teamContainer}>
                <TeamMember />
                <TeamMember />
                <TeamMember />
                <TeamMember />
                <TeamMember />
                <TeamMember />
            </div>
        </div>
    );
}
