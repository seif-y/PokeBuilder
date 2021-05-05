import React, { useState, useEffect } from "react";
import SearchBar from "../../global/SearchBar";
import { getPokemonViewList } from "../../../pokeapi/pokemon";
import { formatName } from "../../../util/names";
import styles from "./TeamMemberSearch.module.css";
import LoadingAnimation from "../../global/LoadingAnimation";
import Modal from "../../global/Modal";

let allPokemon = [];

export default function TeamMemberSearch({ onSelect, showModal, hideModal }) {
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
                        <td className={styles.pokemonName}>{formatName(pokemon.name)}</td>
                        <td className={styles.pokemonID}>#{pokemon.id}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        );
    }

    return (
        <Modal
            show={showModal}
            dismissOnClickOutside
            onCancel={() => hideModal()}
            title={""}
            titleBarChildren={
                <div className={styles.topBarContainer}>
                    <div className={styles.text}>Add Pokémon</div>
                    <div className={styles.searchBar}>
                        <SearchBar onSearch={(searchTerm) => filterResults(searchTerm)} />
                    </div>
                </div>
            }
        >
            <div>
                <div className={styles.tableContainer}>
                    {
                        displayedPokemon ?
                            renderPokemonList() :
                            <div className={styles.centerContent}>
                                <LoadingAnimation size="small"/>
                            </div>
                    }</div>
            </div>
        </Modal>
    );
}
