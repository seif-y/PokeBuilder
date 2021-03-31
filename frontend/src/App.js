import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SideNavbar from "./components/nav/SideNavbar";
import Pokedex from "./components/pokedex/Pokedex";
import TeamBuilder from "./components/team-builder/TeamBuilder";

function App() {
    return (
        <Router>
            <div className="root">
                <SideNavbar />
                <div className="main-content">
                    <Switch>
                        <Route path="/pokedex">
                            <Pokedex />
                        </Route>
                        <Route path="/teams">
                            <TeamBuilder />
                        </Route>
                        <Route path="/">
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
