import React, { useState } from "react";
import TeamMember from "./team-selector/TeamMember";
import styles from "./TeamBuilder.module.css";

export default function TeamBuilder() {
    const [team, setTeam] = useState(Array(6));

    function saveTeam() {
        console.log(team);
    }

    function updateTeam(index, teamMember) {
        let teamMembers = [...team];
        teamMembers[index] = teamMember;
        setTeam(teamMembers);
    }

    function renderTeamSlots() {
        const teamMemberSlots = Array(6);
        for (let i = 0; i < 6; i++) {
            teamMemberSlots[i] = (
                <TeamMember key={`teamSlot${i}`} index={i} onUpdate={(index, obj) => updateTeam(index, obj)} />
            );
        }
        return teamMemberSlots;
    }

    return (
        <div id="modal-root" className={styles.teamBuilderContainer}>
            <div className={styles.titleContainer}>
                <h1> Team Builder </h1>
                <button className={styles.saveButton} onClick={() => saveTeam()}>
                    Save
                </button>
            </div>
            <input className={styles.teamNameInput} placeholder="Team Name" />
            <div className={styles.teamContainer}>{renderTeamSlots()}</div>
            <textarea className={styles.descriptionInput} placeholder="Team description" />
        </div>
    );
}
