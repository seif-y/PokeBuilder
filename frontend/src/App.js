import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SideNavbar from "./components/nav/SideNavbar";
import Pokedex from "./components/pokedex/Pokedex";
import TeamBuilder from "./components/team-builder/TeamBuilder";
import PokemonCardView from "./components/pokedex/PokemonCardView";

function App() {
    return (
        <Router>
            <div className="root">
                <SideNavbar />
                <div className="main-content">
                    <Switch>
                        <Route path="/pokedex">
                            <Pokedex />
                            <PokemonCardView
                                id={1}
                                name="bulbasaur"
                                sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                                types={["grass", "poison"]}
                            />
                            <PokemonCardView
                                id={4}
                                name="charmander"
                                sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
                                types={["fire"]}
                            />
                            <PokemonCardView
                                id={7}
                                name="squirtle"
                                sprite="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/7.png"
                                types={["water"]}
                            />
                        </Route>
                        <Route path="/teams">
                            <TeamBuilder />
                        </Route>
                        <Route path="/" exact>
                            <Redirect to="/pokedex" />
                        </Route>
                        <Route path="*">
                            <div>syke! thats the wrong number!</div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
