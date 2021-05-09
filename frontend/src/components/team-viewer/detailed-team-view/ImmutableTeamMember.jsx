import { formatName } from "../../../util/names";
import PokeType from "../../global/PokeType";
import styles from "./ImmutableTeamMember.module.css";
import BlackHeadingTag from "../../global/BlackHeadingTag";
import React from "react";

function PokemonTypes({ types }) {
    return (
        <div className={styles.typeContainer}>
            {types.map((type, index) => (
                <PokeType key={index} onClick={() => {}} size="small" typeName={type} />
            ))}
        </div>
    );
}

/**
 * Similar to TeamMember except it does no fetching
 * Instead we hand it all the props it needs
 */
export default function ImmutableTeamMember({ name, notes, sprite, types }) {
    return (
        <div className={styles.teamMemberContainer}>
            <div className={styles.spriteContainer}>
                <img src={sprite} alt={name} className={styles.pokemonSprite} />
                <div className={styles.bgCircle} />
            </div>
            <div className={styles.pokemonInfo}>
                <BlackHeadingTag text={formatName(name)} />
                <div className={styles.typeContainer}>
                    <PokemonTypes types={types} />
                </div>
                <div className={styles.notesArea}>{notes}</div>
            </div>
        </div>
    );
}
