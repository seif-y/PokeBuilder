import React, { createContext, useEffect, useState } from "react";
import { getPokemonViewList } from "./pokemon";



const PokemonDataContextProvider = ({ children }) => {
    const [pokemonViewsMap, setPokemonViewsMap] = useState(null);

    let pokemon = [];
    const updatePokemonViews = async () => {
        console.log("loading pokemon")
        pokemon = await getPokemonViewList();
        console.log("done loading pokemon")
        setPokemonViewsMap(pokemon);
    };

    useEffect(() => {
        updatePokemonViews();
    }, []);

    console.log(pokemonViewsMap)
    return (
        <PokemonDataContext.Provider value={pokemonViewsMap}>
            {children}
        </PokemonDataContext.Provider>
    );

}
export const PokemonDataContext = createContext(null)

export default PokemonDataContextProvider