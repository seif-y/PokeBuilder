import React, { useState } from "react";
import PokeType from "../global/PokeType";
import Modal from "../global/Modal";
import TeamMemberSearch from "./TeamMemberSearch";
import styles from "./TeamMember.module.css";
import CloseIcon from "@material-ui/icons/Close";

export default function TeamMemberSlot() {
    const [pokemon, setPokemon] = useState(null);
    const [showModal, setShowModal] = useState(false);

    function renderTypes() {
        return pokemon.types.map((type, index) => {
            return <PokeType size="small" typeName={type} onClick={(e) => e.stopPropagation()} />;
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
                        <input type="text" placeholder="Notes" onClick={(e) => e.stopPropagation()} />
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
