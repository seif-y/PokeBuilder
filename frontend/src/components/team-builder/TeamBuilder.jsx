import { Button } from "@material-ui/core";
import React, { useState } from "react";
import TextArea from "../global/TextArea";
import TeamMember from "./team-selector/TeamMember";
import styles from "./TeamBuilder.module.css";
import { getAuthConfig, getToken } from "../../util/auth";
import axios from "axios";
import { useHistory } from "react-router";

export default function TeamBuilder() {
    const [team, setTeam] = useState(Array(6));
    const [name, setName] = useState();
    const [description, setDescription] = useState();
    const history = useHistory();
    function saveTeam() {
        let body = {
            teamName: name,
            description: description,
            party: team,
        };

        // Make POST request to teams endpoint.
        axios
            .post("/api/teams", body, getAuthConfig(getToken()))
            .then((res) => {
                history.push(`/teams/${res.data._id}`);
            })
            .catch((err) => {});
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
                <Button variant="contained" onClick={() => saveTeam()}>
                    Save
                </Button>
            </div>
            <input className={styles.teamNameInput} placeholder="Team Name" onChange={(e) => setName(e.target.value)} />
            <div className={styles.teamContainer}>{renderTeamSlots()}</div>
            <TextArea classes={styles.descriptionInput} placeholder="Team description" onChange={setDescription} />
        </div>
    );
}
