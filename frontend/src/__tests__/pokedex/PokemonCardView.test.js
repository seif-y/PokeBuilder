import { render, screen } from "@testing-library/react";
import renderer from "react-test-renderer";
import { StaticRouter } from "react-router";
import PokemonCardView from "../../components/pokedex/PokemonCardView";

const testMon = {
    name: "muk",
    id: 89,
    sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/89.png",
    types: ["poison"],
    displayName: "Muk",
};

const testMonCard = (
    <StaticRouter>
        <PokemonCardView name={testMon.name} id={testMon.id} sprite={testMon.sprite} types={testMon.types} />
    </StaticRouter>
);

describe("PokemonCardView basic tests", () => {
    beforeEach(() => {
        render(testMonCard);
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

test("PokemonCardView snapshot test", () => {
    const tree = renderer.create(testMonCard).toJSON();
    expect(tree).toMatchSnapshot();
});
