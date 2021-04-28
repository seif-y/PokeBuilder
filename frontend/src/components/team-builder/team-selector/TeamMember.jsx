import React, { useState, useEffect } from "react";
import PokeType from "../../global/PokeType";
import Modal from "../../global/Modal";
import TeamMemberSearch from "./TeamMemberSearch";
import styles from "./TeamMember.module.css";
import CloseIcon from "@material-ui/icons/Close";

export default function TeamMember({ index, onUpdate }) {
    const [pokemon, setPokemon] = useState(null);
    const [notes, setNotes] = useState("");
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (pokemon) {
            onUpdate(index, {
                id: pokemon.id,
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
            return "+";
        } else {
            return (
                <React.Fragment>
                    <img src={pokemon.sprite} alt={pokemon.name} className={styles.pokemonSprite} />
                    <div className={styles.pokemonInfo}>
                        <h3 className={styles.pokemonName}>
                            {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                        </h3>
                        <div className={styles.typeContainer}>{renderTypes()}</div>
                        <textarea
                            className={styles.notesArea}
                            placeholder="Notes"
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </div>
                    <CloseIcon className={styles.closeButton} onClick={(e) => clearPokemon(e)} />
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
            <Modal show={showModal} dismissOnClickOutside onCancel={() => setShowModal(false)}>
                <TeamMemberSearch onSelect={(pokemon) => choosePokemon(pokemon)} />
            </Modal>
        </React.Fragment>
    );
}
