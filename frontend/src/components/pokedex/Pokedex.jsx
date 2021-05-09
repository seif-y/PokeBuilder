import React, { useContext, useEffect, useState } from "react";
import PokemonCard from "./PokemonCardView";
import styles from "./Pokedex.module.css";
import SearchBar from "../global/SearchBar";
import TopBar from "../global/TopBar";
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
        <div className={`${styles.resultNotFound} ${styles.pokemonDisplay}`}>No results found</div>
    ) : (
        <div className={`${styles.pokemonDisplay} ${styles.grid}`}>
            {pokemon.map(({ id, name, sprite, types }) => {
                return (
                    <div key={id} className={styles.pokemonCard}>
                        <PokemonCard id={id} name={name} sprite={sprite} types={types} />
                    </div>
                );
            })}
        </div>
    );
}

export default function Pokedex() {
    let allPokemonViews = useContext(PokemonDataContext);
    const [pokemonViews, setPokemonViews] = useState(null);
    const [nameFilter, setNameFilter] = useState("");
    const [typeFilter, setTypeFilter] = useState([]);

    useEffect(() => {
        if (!allPokemonViews) return;
        // Always show the pokemon if filter properties are empty
        const nameMatches = (filterName, name) => filterName === "" || name.startsWith(filterName);
        const typesMatch = (filterTypes, types) =>
            filterTypes.length === 0 || types.some((type) => filterTypes.includes(type));
        setPokemonViews(() =>
            allPokemonViews.filter(
                ({ name: pokemonName, types: pokemonTypes }) =>
                    nameMatches(nameFilter, pokemonName) && typesMatch(typeFilter, pokemonTypes)
            )
        );
    }, [nameFilter, typeFilter, allPokemonViews]);

    function handleOnSearch(query) {
        setNameFilter(query);
    }

    function handleOnFiltersUpdated(types) {
        setTypeFilter(types);
    }

    const filtersOn = typeFilter.length > 0;

    return (
        <>
            <TopBar title="DEX">
                <SearchBar onSearch={handleOnSearch} />
                <TypeFilter onFiltersUpdated={handleOnFiltersUpdated} />
            </TopBar>
            <div className={filtersOn ? styles.filtersBarActive : styles.filtersBar}>
                {typeFilter.map((type) => {
                    return (
                        <div key={`filter${type}`}>
                            <PokeType typeName={type} size={"small"} />
                        </div>
                    );
                })}
            </div>
            <GridOfPokemon pokemon={pokemonViews} />
        </>
    );
}
