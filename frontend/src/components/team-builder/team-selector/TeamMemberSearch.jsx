import React, { useState, useEffect } from "react";
import SearchBar from "../../global/SearchBar";
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
        if (displayedPokemon.length < 1) {
            return <p>No results found</p>;
        }

        return displayedPokemon.map((pokemon) => (
            <tr className={styles.tableRow} onClick={() => onSelect(pokemon)}>
                <td>
                    <img className={styles.pokemonSprite} src={pokemon.sprite} alt={pokemon.name} />
                </td>
                <td className={styles.pokemonName}>{pokemon.name}</td>
                <td>#{pokemon.id}</td>
            </tr>
        ));
    }

    return (
        <div>
            <SearchBar onSearch={(searchTerm) => filterResults(searchTerm)} />
            <div className={styles.tableContainer}>
                <table className={styles.table} cellSpacing="0">
                    {displayedPokemon ? renderPokemonList() : "..."}
                </table>
            </div>
        </div>
    );
}