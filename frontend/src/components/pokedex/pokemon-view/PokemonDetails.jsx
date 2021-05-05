import React, { useEffect, useState } from "react";
import { getPokemonInformation, getPokemonViewList } from "../../../pokeapi/pokemon";
import LoadingAnimation from "../../global/LoadingAnimation";
import styles from "./PokemonDetails.module.css";

export default function PokemonDetails({name}) {
    let pokemon = {}

    const [pokemonInfo, setPokemonInfo] = useState(null);

    useEffect(() => {
        const updatePokemonViews = async () => {
            pokemon = await getPokemonInformation(name);
            setPokemonInfo(pokemon);
        };
        updatePokemonViews();
    }, []);

    if (pokemonInfo) {
        return (
            <div>
                <span>{pokemonInfo.description}</span>
            </div>
        );
    } else {
        return <div className={styles.centerContent}>
            <LoadingAnimation />
        </div>
    }
}
