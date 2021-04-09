import { filter, last, mapPromise, pipe, pipePromise, prop, propEq, replace, zipToObject } from "./helpers";
import axios from "axios";

const DOMAIN = "https://pokeapi.co/api/v2";

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

// Larger data structure for more detail
const formatToPokemonInformation = async (pokemonData) => {
    const formatStats = (pokemonStats) => {
        const statNamesInApiOrder = ["hp", "attack", "defense", "specialAttack", "specialDefense", "speed"];
        const baseStats = pokemonStats.map(prop("base_stat"));
        return zipToObject(statNamesInApiOrder, baseStats);
    };
    const getPokedexDescription = (pokemonId) => {
        const url = `${DOMAIN}/pokemon-species/${pokemonId}`;
        return pipePromise(
            getDataFromUrl,
            prop("flavor_text_entries"),
            filter(pipe(prop("language"), propEq("en")("name"))),
            last, // gets the most up-to-date english entry
            prop("flavor_text"),
            replace(/\n/g, " ")
        )(url);
    };

    return Object.assign(
        {},
        formatToPokemonView(pokemonData),
        { baseStats: formatStats(pokemonData.stats) },
        { description: await getPokedexDescription(pokemonData.id) }
    );
};

// Returns a PokemonInformation object
export async function getPokemonInformation(pokemonIdOrName) {
    console.log(pokemonIdOrName);
    const url = `${DOMAIN}/pokemon/${pokemonIdOrName}`;
    return pipePromise(getDataFromUrl, formatToPokemonInformation)(url);
}

// Returns a list of PokemonViews
export async function getPokemonViewList() {
    const numberOfPokemon = 151;
    const originalUrl = `${DOMAIN}/pokemon?limit=${numberOfPokemon}`;

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
