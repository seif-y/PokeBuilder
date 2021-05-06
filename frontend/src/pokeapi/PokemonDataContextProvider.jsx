import React, { createContext, useEffect, useState } from "react";
import { getPokemonViewList } from "./pokemon";



const PokemonDataContextProvider = ({ children }) => {
    const [pokemonViewsMap, setPokemonViewsMap] = useState(null);

    let pokemon = [];
    const updatePokemonViews = async () => {
        pokemon = await getPokemonViewList();
        setPokemonViewsMap(pokemon);
    };

    useEffect(() => {
        updatePokemonViews();
    }, []);

    return (
        <PokemonDataContext.Provider value={pokemonViewsMap}>
            {children}
        </PokemonDataContext.Provider>
    );

}
export const PokemonDataContext = createContext(null)

export default PokemonDataContextProvider