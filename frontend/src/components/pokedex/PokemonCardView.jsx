import React from "react";
import { Link } from "react-router-dom";
import styles from "./PokemonCardView.module.css";
import PokeType from "../global/PokeType";

/**
 * A basic Pokemon view which displays the Pokemon's sprite, name, dex number and type.
 * @param id: A number representing the Pokemon's dex number
 * @param name: A lowercase string representing the Pokemon's name
 * @param sprite: A string url to the Pokemon's sprite png
 * @param types: An array of strings representing each type name in lowercase
 */
export default function PokemonCardView({ id, name, sprite, types }) {
    // Some Pokemon sprites have their faces covered by their Dex number in the component,
    // so we want to mirror those select sprites for a nicer aesthetic. Array of their ID nums.
    const pokemonSpritesToMirror = [9, 53, 84, 147];

    let capitalisedName = name.charAt(0).toUpperCase() + name.slice(1);

    return (
        <div className={styles.container}>
            <Link className={styles.link} to={`/pokedex/${name}`}>
                <div className={styles.content}>

                    <img className={styles.sprite}
                         style={pokemonSpritesToMirror.includes(id) ? { transform: "scale(-1, 1)" } : null} src={sprite}
                         alt={`Pokémon #${id}`} />
                    <div className={styles.bgCircle} />
                    <div className={styles.nameContainer}>
                        <span className={styles.name}>{capitalisedName}</span>
                    </div>
                    <div className={styles.types}>
                        <PokeType typeName={types[0]} size="small" />
                        {types[1] ? <PokeType typeName={types[1]} size="small" /> : null}
                    </div>
                    <div className={styles.idContainer}>
                        <div>{`#${id}`}</div>
                    </div>

                </div>
            </Link>
        </div>
    );
}
