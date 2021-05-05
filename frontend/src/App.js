import "./App.css";
import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import SideNavbar from "./components/nav/SideNavbar";
import Pokedex from "./components/pokedex/Pokedex";
import TeamBuilder from "./components/team-builder/TeamBuilder";
import TeamViewer from "./components/team-viewer/TeamViewer";

export const AuthContext = createContext("pokebuilderAuthToken" in localStorage);

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    return (
        <Router>
            <AuthContext.Provider value={[loggedIn, setLoggedIn]}>
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
            </AuthContext.Provider>
        </Router>
    );
}

export default App;
