import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCardView";
import { getPokemonViewList } from "../../pokeapi/pokemon";
import styles from "./Pokedex.module.css";
import SearchBar from "./top-bar/SearchBar";
import TopBar from "./top-bar/TopBar";

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
        const queryIsEmpty = query === "";
        setPokemonViews(() => allPokemonViews.filter(({ name }) => queryIsEmpty || name.startsWith(query)));
    }

    return (
        <>
            <TopBar>
                <SearchBar onSearch={handleOnSearch} />
            </TopBar>
            <GridOfPokemon pokemon={pokemonViews} />
        </>
    );
}
