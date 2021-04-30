import { Button } from "@material-ui/core";
import React, { useState } from "react";
import TeamMember from "./team-selector/TeamMember";
import styles from "./TeamBuilder.module.css";

export default function TeamBuilder() {
    const [team, setTeam] = useState(Array(6));
    const [name, setName] = useState();
    const [description, setDescription] = useState();

    function saveTeam() {
        // TODO: Once user auth is implemented, set 'creator' to the username of the logged in user
        let body = {
            creator: "anonymous",
            name: name,
            description: description,
            party: team,
        };

        //TODO: Do any required data verification on the frontend.

        //TODO: Make POST request to teams endpoint.
        console.log(body);
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
                <Button variant="contained" className={styles.saveButton} onClick={() => saveTeam()}>
                    Save
                </Button>
            </div>
            <input className={styles.teamNameInput} placeholder="Team Name" onChange={(e) => setName(e.target.value)} />
            <div className={styles.teamContainer}>{renderTeamSlots()}</div>
            <textarea
                className={styles.descriptionInput}
                placeholder="Team description"
                onChange={(e) => setDescription(e.target.value)}
            />
        </div>
    );
}
