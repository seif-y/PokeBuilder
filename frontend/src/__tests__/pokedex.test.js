import { render, screen } from "@testing-library/react";
import { StaticRouter } from "react-router";
import Pokedex from "../components/pokedex/Pokedex";
import PokemonCardView from "../components/pokedex/PokemonCardView";

const testMon = {
    name: "muk",
    id: 89,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png",
    types: ["poison"],
    displayName: "Muk",
};

describe("General Pokedex tests", () => {
    beforeEach(() => {
        render(<Pokedex />);
    });

    test("Pokedex has a searchbar", () => {
        const searchBar = screen.getByPlaceholderText("Search for a pokemon's name");
        expect(searchBar).toBeDefined();
    });
});

describe("PokemonCardView tests", () => {
    beforeEach(() => {
        render(
            <StaticRouter>
                <PokemonCardView name={testMon.name} id={testMon.id} sprite={testMon.sprite} types={testMon.types} />
            </StaticRouter>
        );
    });

    test("Pokemon card view contains pokemon name", () => {
        const pokemonNameField = screen.getByText(testMon.displayName);
        expect(pokemonNameField).toBeDefined();
    });

    test("Pokemon card view contains pokemon ID", () => {
        const pokemonIdField = screen.getByText(`#${testMon.id}`);
        expect(pokemonIdField).toBeDefined();
    });

    test("Pokemon Sprite exists", () => {
        const pokemonSprite = screen.getByAltText(`Pokémon #${testMon.id}`);
        expect(pokemonSprite).toBeDefined();
    });
});
