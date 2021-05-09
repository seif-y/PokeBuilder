import React, { useEffect, useState } from "react";
import PokeType from "../../global/PokeType";
import TextArea from "../../global/TextArea";
import TeamMemberSearch from "./TeamMemberSearch";
import styles from "./TeamMember.module.css";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
import { formatName } from "../../../util/names";
import BlackHeadingTag from "../../global/BlackHeadingTag";

export default function TeamMember({ index, onUpdate }) {
    const [pokemon, setPokemon] = useState(null);
    const [notes, setNotes] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (pokemon) {
            onUpdate(index, {
                pokemonID: pokemon.id,
                notes: notes,
            });
        }
    }, [pokemon, notes]);

    function renderTypes() {
        return pokemon.types.map((type, i) => {
            return (
                <PokeType
                    key={`teamSlot${index}-${type}`}
                    size="small"
                    typeName={type}
                    onClick={(e) => e.stopPropagation()}
                />
            );
        });
    }

    function renderPokemon() {
        if (pokemon === null) {
            return (
                <div className={styles.addIconContainer}>
                    <AddIcon fontSize="large" color="action" />
                </div>
            );
        } else {
            return (
                <React.Fragment>
                    <div className={styles.teamMemberContainer}>
                        <div className={styles.spriteContainer}>
                            <img src={pokemon.sprite} alt={pokemon.name} className={styles.pokemonSprite} />
                            <div className={styles.bgCircle} />
                        </div>
                        <div className={styles.pokemonInfo}>
                            <BlackHeadingTag text={formatName(pokemon.name)} />
                            <div className={styles.typeContainer}>{renderTypes()}</div>
                            <TextArea classes={styles.notesArea} onChange={setNotes} placeholder="Notes" />
                        </div>
                        <CloseIcon color="action" className={styles.closeButton} onClick={(e) => clearPokemon(e)} />
                    </div>
                </React.Fragment>
            );
        }
    }

    function choosePokemon(pokemon) {
        setPokemon(pokemon);
        setShowModal(false);
    }

    function clearPokemon(e) {
        e.stopPropagation();
        setPokemon(null);
    }

    return (
        <React.Fragment>
            <div className={styles.container} onClick={() => (pokemon ? null : setShowModal(true))}>
                {renderPokemon()}
            </div>
            <TeamMemberSearch
                onSelect={(pokemon) => choosePokemon(pokemon)}
                showModal={showModal}
                hideModal={() => setShowModal(false)}
            />
        </React.Fragment>
    );
}
