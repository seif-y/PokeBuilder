import React, { useState, useEffect } from "react";
import SearchBar from "../pokedex/SearchBar";
import { getPokemonViewList } from "../../pokeapi/pokemon";

let allPokemon = [];

export default function TeamMemberSearch({ onSelect }) {
    const [displayedPokemon, setDisplayedPokemon] = useState([]);

    useEffect(() => {
        const updatePokemonViews = async () => {
            allPokemon = await getPokemonViewList();
            setDisplayedPokemon(allPokemon);
        };
        updatePokemonViews();
    }, []);

    function filterResults(query) {
        setDisplayedPokemon(allPokemon.filter((name) => name.startsWith(query)));
    }

    return (
        <div>
            <SearchBar onSearch={(searchTerm) => filterResults(searchTerm)} />
            <div style={{ height: "400px", overflowY: "auto" }}>
                {displayedPokemon.map((pokemon) => (
                    <div onClick={() => onSelect(pokemon)}>
                        #{pokemon.id} - {pokemon.name}
                    </div>
                ))}
            </div>
        </div>
    );
}
