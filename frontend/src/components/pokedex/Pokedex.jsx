import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCardView";
import { getPokemonViewList } from "../../pokeapi/pokemon";
import styles from "./Pokedex.module.css";
import SearchBar from "./top-bar/SearchBar";
import TopBar from "./top-bar/TopBar";
import TypeFilter from "./top-bar/TypeFilter";

function GridOfPokemon({ pokemon }) {
    return (
        <div className={styles.pokemonGrid}>
            {pokemon.map(({ id, name, sprite, types }) => (
                <PokemonCard key={id} id={id} name={name} sprite={sprite} types={types} />
            ))}
        </div>
    );
}

let allPokemonViews = [];

// Global object used to decide which pokemon to display
const filter = {
    name: "",
    types: [],
};

export default function Pokedex() {
    const [pokemonViews, setPokemonViews] = useState([]);
    useEffect(() => {
        const updatePokemonViews = async () => {
            allPokemonViews = await getPokemonViewList();
            setPokemonViews(allPokemonViews);
        };
        updatePokemonViews();
    }, []);

    function handleOnSearch(query) {
        filter.name = query;
        runFilters();
    }

    function handleOnFiltersUpdated(types) {
        filter.types = types;
        runFilters();
    }

    function runFilters() {
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

    // todo remove horizontal scroll when modal pops up
    return (
        <>
            <TopBar>
                <span className={styles.title}>DEX</span>
                <SearchBar onSearch={handleOnSearch} />
                <TypeFilter onFiltersUpdated={handleOnFiltersUpdated} />
            </TopBar>
            <GridOfPokemon pokemon={pokemonViews} />
        </>
    );
}
