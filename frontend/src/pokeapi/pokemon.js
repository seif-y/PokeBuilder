import { mapPromise, pipe, pipePromise, prop } from "./helpers";
import axios from "axios";

// expects URL string and returns Promise(any)
const getDataFromUrl =
    // Using pipePromise to hide the .thens
    pipePromise(axios.get, prop("data"));

// Use our own data structure for simplification
const formatToPokemonView = (pokemonData) => ({
    id: pokemonData.id,
    name: pokemonData.name,
    sprite: pokemonData.sprites.other["official-artwork"].front_default,
    types: pokemonData.types.map(pipe(prop("type"), prop("name"))),
});

// Returns a list of PokemonViews
export async function getPokemonViewList() {
    const domain = "https://pokeapi.co/api/v2/pokemon";
    const numberOfPokemon = 151;
    const originalUrl = `${domain}?limit=${numberOfPokemon}`;

    return pipePromise(
        getDataFromUrl,
        prop("results"), // The data from originalUrl returns an array of {name, url} objects
        mapPromise(
            pipePromise(
                prop("url"), // Each Pokemon has their own endpoint for their data
                getDataFromUrl,
                formatToPokemonView
            )
        )
    )(originalUrl);
}
