import {
    filter,
    last,
    mapPromise,
    pipe,
    pipePromise,
    prop,
    propEq,
    replace,
    zipToObject,
    getJsonPath,
} from "./helpers";
import axios from "axios";

const DOMAIN = "https://pokeapi.co/api/v2";

// expects URL string and returns Promise(any)
const getDataFromUrl =
    // Using pipePromise to hide the .thens
    pipePromise(axios.get, prop("data"));

// Use our own data structure for simplification
const formatToPokemonView = (spritePath = "other.official-artwork.front_default") => (pokemonData) => ({
    id: pokemonData.id,
    name: pokemonData.name,
    sprite: getJsonPath(pokemonData.sprites, spritePath),
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
            last, // Of the english entries, get the one most up-to-date
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

const getPokemonView = async (pokemonIdOrName, spritePath) => {
    return pipePromise(getDataFromUrl, formatToPokemonView(spritePath))(`${DOMAIN}/pokemon/${pokemonIdOrName}`);
};

// Returns a PokemonInformation object
export async function getPokemonInformation(pokemonIdOrName) {
    const url = `${DOMAIN}/pokemon/${pokemonIdOrName}`;
    return pipePromise(getDataFromUrl, formatToPokemonInformation)(url);
}

export async function formatParty(party) {
    return Promise.all(
        party.map(async (pokemon) => {
            const pokemonView = await getPokemonView(pokemon.pokemonID);
            return Object.assign({}, pokemon, pokemonView);
        })
    );
}

// Returns a list of PokemonViews
export async function getPokemonViewList(spritePath) {
    const numberOfPokemon = 151;
    const originalUrl = `${DOMAIN}/pokemon?limit=${numberOfPokemon}`;

    return pipePromise(
        getDataFromUrl,
        prop("results"), // The data from originalUrl returns an array of {name, url} objects
        mapPromise(
            pipePromise(
                prop("url"), // Each Pokemon has their own endpoint for their data
                getDataFromUrl,
                formatToPokemonView(spritePath)
            )
        )
    )(originalUrl);
}
