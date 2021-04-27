import React from "react";
import PokeType from "../global/PokeType";
import styles from "./TeamMember.module.css";

export default function TeamMemberSlot({ pokemon }) {
    function renderTypes() {
        return pokemon.types.map((type, index) => {
            return <PokeType size="small" typeName={type} onClick={(e) => e.preventDefault()} />;
        });
    }

    function renderPokemon() {
        if (pokemon === undefined || pokemon === null) {
            return "+";
        } else {
            return (
                <React.Fragment>
                    <img src={pokemon.sprite} alt="yer" className={styles.pokemonSprite} />
                    <div className={styles.pokemonInfo}>
                        <h3 className={styles.pokemonName}>{pokemon.name}</h3>
                        <div className={styles.typeContainer}>{renderTypes()}</div>
                        <input type="text" placeholder="Notes" />
                    </div>
                </React.Fragment>
            );
        }
    }

    return <div className={styles.container}>{renderPokemon()}</div>;
}
