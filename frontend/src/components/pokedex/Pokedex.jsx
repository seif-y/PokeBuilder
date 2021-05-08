import React, { useContext, useEffect, useState } from "react";
import PokemonCard from "./PokemonCardView";
import styles from "./Pokedex.module.css";
import SearchBar from "../global/SearchBar";
import TopBar from "./top-bar/TopBar";
import TypeFilter from "./top-bar/TypeFilter";
import PokeType from "../global/PokeType";
import LoadingAnimation from "../global/LoadingAnimation";
import { PokemonDataContext } from "../../pokeapi/PokemonDataContextProvider";

function GridOfPokemon({ pokemon }) {
    if (pokemon === null) {
        return (
            <div className={styles.centerContent}>
                <LoadingAnimation />
            </div>
        );
    }
    const isEmpty = pokemon.length === 0;

    return isEmpty ? (
        <div className={styles.pokemonDisplay}>No results found</div>
    ) : (
        <div className={`${styles.pokemonDisplay} ${styles.grid}`}>
            {pokemon.map(({ id, name, sprite, types }) => {
                return (
                    <div className={styles.pokemonCard}>
                        <PokemonCard key={id} id={id} name={name} sprite={sprite} types={types} />
                    </div>
                );
            })}
        </div>
    );
}

// Global object used to decide which pokemon to display
const filter = {
    name: "",
    types: [],
};

export default function Pokedex() {
    let allPokemonViews = useContext(PokemonDataContext);
    const [pokemonViews, setPokemonViews] = useState(null);

    useEffect(() => {
        setPokemonViews(allPokemonViews);
    }, [allPokemonViews]);

    function handleOnSearch(query) {
        filter.name = query;
        runFilters();
    }

    function handleOnFiltersUpdated(types) {
        filter.types = types;
        runFilters();
    }

    function runFilters() {
        if (!pokemonViews) {
            return;
        }
        // Always show the pokemon if filter properties are empty
        const nameMatches = (filterName, name) => filterName === "" || name.startsWith(filterName);
        const typesMatch = (filterTypes, types) =>
            filterTypes.length === 0 || types.some((type) => filterTypes.includes(type));
        setPokemonViews(() =>
            allPokemonViews.filter(
                ({ name: pokemonName, types: pokemonTypes }) =>
                    nameMatches(filter.name, pokemonName) && typesMatch(filter.types, pokemonTypes)
            )
        );
    }

    const filtersOn = filter.types.length > 0;

    return (
        <>
            <TopBar>
                <span className={styles.title}>DEX</span>
                <SearchBar onSearch={handleOnSearch} />
                <TypeFilter onFiltersUpdated={handleOnFiltersUpdated} />
            </TopBar>
            <div className={filtersOn ? styles.filtersBarActive : styles.filtersBar}>
                {filter.types.map((type) => {
                    return (
                        <div>
                            <PokeType typeName={type} size={"small"} />
                        </div>
                    );
                })}
            </div>
            <GridOfPokemon pokemon={pokemonViews} />
        </>
    );
}
