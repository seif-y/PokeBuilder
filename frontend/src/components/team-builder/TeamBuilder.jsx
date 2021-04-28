import React from "react";
import TeamMember from "./team-selector/TeamMember";
import styles from "./TeamBuilder.module.css";

export default function TeamBuilder() {
    return (
        <div id="modal-root" className={styles.teamBuilderContainer}>
            <div className={styles.titleContainer}>
                <h1> Team Builder </h1>
                <button className={styles.saveButton}>Save</button>
            </div>
            <input className={styles.teamNameInput} placeholder="Team Name" />
            <div className={styles.teamContainer}>{Array(6).fill(<TeamMember />)}</div>
            <textarea className={styles.descriptionInput} placeholder="Team description" />
        </div>
    );
}
