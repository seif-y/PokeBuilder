import React, { useContext, useEffect, useState } from "react";
import SearchBar from "../../global/SearchBar";
import { formatName } from "../../../util/names";
import styles from "./TeamMemberSearch.module.css";
import LoadingAnimation from "../../global/LoadingAnimation";
import Modal from "../../global/Modal";
import { PokemonDataContext } from "../../../pokeapi/PokemonDataContextProvider";

export default function TeamMemberSearch({ onSelect, showModal, hideModal }) {
    let allPokemonViews = useContext(PokemonDataContext);
    const [pokemonViews, setPokemonViews] = useState(null);

    useEffect(() => {
        setPokemonViews(allPokemonViews);
    }, [allPokemonViews]);


    function filterResults(query) {
        setPokemonViews(allPokemonViews.filter((pokemon) => pokemon.name.startsWith(query)));
    }

    function renderPokemonList() {
        if (pokemonViews.length < 1) {
            return <p>No results found</p>;
        }

        return (
            <table className={styles.table} cellSpacing="0">
                <tbody>
                {pokemonViews.map((pokemon) => (
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
                        pokemonViews ?
                            renderPokemonList() :
                            <div className={styles.centerContent}>
                                <LoadingAnimation size="small" />
                            </div>
                    }
                </div>
            </div>
        </Modal>
    );
}
