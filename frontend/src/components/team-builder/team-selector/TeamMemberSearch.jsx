import React, { useState, useEffect } from "react";
import SearchBar from "../../pokedex/SearchBar";
import { getPokemonViewList } from "../../../pokeapi/pokemon";
import styles from "./TeamMemberSearch.module.css";

let allPokemon = [];

export default function TeamMemberSearch({ onSelect }) {
    const [displayedPokemon, setDisplayedPokemon] = useState(null);

    useEffect(() => {
        const updatePokemonViews = async () => {
            allPokemon = await getPokemonViewList();
            setDisplayedPokemon(allPokemon);
        };
        updatePokemonViews();
    }, []);

    function filterResults(query) {
        setDisplayedPokemon(allPokemon.filter((pokemon) => pokemon.name.startsWith(query)));
    }

    function renderPokemonList() {
        return displayedPokemon.map((pokemon) => (
            <div className={styles.pokemonListItem} onClick={() => onSelect(pokemon)}>
                #{pokemon.id} - {pokemon.name}
            </div>
        ));
    }

    return (
        <div>
            <SearchBar onSearch={(searchTerm) => filterResults(searchTerm)} />
            <div className={styles.pokemonList}>{displayedPokemon ? renderPokemonList() : "..."}</div>
        </div>
    );
}
