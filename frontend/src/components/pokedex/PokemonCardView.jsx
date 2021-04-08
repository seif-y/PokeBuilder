import React from "react";
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
    // Capitalise the name
    name = name.charAt(0).toUpperCase() + name.slice(1)

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <img className={styles.sprite} src={sprite} alt={`Pokémon #${id}`}/>
                <div className={styles.bgCircle}/>
                <span className={styles.name}>{name}</span>
                <div className={styles.types}>
                    <PokeType typeName={types[0]} size="small"/>
                    {types[1] ? <PokeType typeName={types[1]} size="small"/> : null}
                </div>
                <div className={styles.idContainer}>
                    <div>{`#${id}`}</div>
                </div>
            </div>
        </div>
    )
}
