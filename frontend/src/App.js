import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SideNavbar from "./components/nav/SideNavbar";
import Pokedex from "./components/pokedex/Pokedex";
import TeamBuilder from "./components/team-builder/TeamBuilder";
import TeamViewer from "./components/team-viewer/TeamViewer";

function App() {
    return (
        <Router>
            <div id="modal-root" className="root">
                <SideNavbar />
                <div className="main-content">
                    <Switch>
                        <Route path="/pokedex">
                            <Pokedex />
                        </Route>
                        <Route path="/team-builder">
                            <TeamBuilder />
                        </Route>
                        <Route path="/teams">
                            <TeamViewer />
                        </Route>
                        <Route path="/" exact>
                            <Redirect to="/pokedex" />
                        </Route>
                        <Route path="*">
                            <div>
                                <img className="not-found-image" src="/images/missingno.gif" alt="MissingNo." />
                                <h3>The page you're looking for was not found.</h3>
                            </div>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
