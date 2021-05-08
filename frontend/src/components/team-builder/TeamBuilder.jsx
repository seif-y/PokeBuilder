import React, { useState } from "react";
import TextArea from "../global/TextArea";
import TeamMember from "./team-selector/TeamMember";
import SnackbarMessage from "../global/SnackbarMessage";
import styles from "./TeamBuilder.module.css";
import { getAuthConfig, getToken } from "../../util/auth";
import axios from "axios";
import { useHistory } from "react-router";
import Button from "../global/Button";
import TopBar from "../global/TopBar";

export default function TeamBuilder() {
    const [team, setTeam] = useState(Array(6));
    const [name, setName] = useState();
    const [description, setDescription] = useState("");
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState();

    const history = useHistory();

    function saveTeam() {
        let body = {
            teamName: name,
            description: description,
            party: team.filter((pokemon) => {
                return pokemon != null;
            }),
        };

        // Make POST request to teams endpoint.
        axios
            .post("/api/teams", body, getAuthConfig(getToken()))
            .then((res) => {
                history.push(`/teams/${res.data._id}`);
            })
            .catch((err) => {
                setErrorMessage(
                    "Could not create team. Make sure that you are logged in and that all required fields are filled."
                );
                setShowError(true);
            });
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
        <div className={styles.teamBuilderContainer}>
            <TopBar title="TEAM BUILDER">
                <input
                    className={styles.teamNameInput}
                    placeholder="Team Name"
                    onChange={(e) => setName(e.target.value)}
                />
                <div className={styles.hSpacer} />
                <Button text="Save" color="white" onClick={() => saveTeam()} />
            </TopBar>
            <div className={styles.pageContent}>
                <div className={styles.vSpacer} />
                <div className={styles.teamContainer}>{renderTeamSlots()}</div>
                <div className={styles.vSpacer} />
                <TextArea classes={styles.descriptionInput} placeholder="Team description" onChange={setDescription} />
                <div className={styles.vSpacer} />
                <SnackbarMessage show={showError} setShow={setShowError} duration={3000} message={errorMessage} />
            </div>
        </div>
    );
}
