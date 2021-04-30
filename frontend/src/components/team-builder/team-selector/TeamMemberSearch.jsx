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

        return (
            <table className={styles.table} cellSpacing="0">
                <tbody>
                    {displayedPokemon.map((pokemon) => (
                        <tr key={pokemon.name} className={styles.tableRow} onClick={() => onSelect(pokemon)}>
                            <td className={styles.pokemonSprite}>
                                <img src={pokemon.sprite} alt={pokemon.name} />
                            </td>
                            <td className={styles.pokemonName}>{pokemon.name}</td>
                            <td className={styles.pokemonID}>#{pokemon.id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    return (
        <div>
            <SearchBar onSearch={(searchTerm) => filterResults(searchTerm)} />
            <div className={styles.tableContainer}>{displayedPokemon ? renderPokemonList() : <p>...</p>}</div>
        </div>
    );
}
