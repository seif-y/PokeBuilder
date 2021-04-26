import { useState, useEffect } from "react";
import PokemonCard from "./PokemonCardView";
import { getPokemonViewList } from "../../pokeapi/pokemon";

function GridOfPokemon() {
    const [pokemonViews, setPokemonViews] = useState([]);
    useEffect(() => {
        const updatePokemonViews = async () => {
            setPokemonViews(await getPokemonViewList());
        };
        updatePokemonViews();
    }, []);
    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)" }}>
            {pokemonViews.map(({ id, name, sprite, types }) => (
                <PokemonCard id={id} name={name} sprite={sprite} types={types} />
            ))}
        </div>
    );
}


export default function Pokedex() {
    return <GridOfPokemon />;
}
