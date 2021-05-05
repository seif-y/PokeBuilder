import "./App.css";
import axios from "axios";
import React, { useEffect, useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, useParams } from "react-router-dom";
import SideNavbar from "./components/nav/SideNavbar";
import Pokedex from "./components/pokedex/Pokedex";
import TeamBuilder from "./components/team-builder/TeamBuilder";
import TeamViewer from "./components/team-viewer/TeamViewer";
import DetailedTeamView from "./components/team-viewer/detailed-team-view/DetailedTeamView";

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
                            <Route path="/teams/:id">
                                <SpecificTeam />
                            </Route>
                            <Route path="/teams">
                                <TeamViewer />
                            </Route>
                            <Route path="/" exact>
                                <Redirect to="/pokedex" />
                            </Route>
                            <Route path="*">
                                <NOT_FOUND />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </AuthContext.Provider>
        </Router>
    );
}

function NOT_FOUND() {
    return (
        <div className="not-found">
            <img className="not-found-image" src="/images/missingno.gif" alt="MissingNo." />
            <h3>The page you're looking for was not found.</h3>
        </div>
    );
}

function SpecificTeam() {
    const { id: teamID } = useParams();
    const [teamRes, setTeamRes] = useState({});

    useEffect(() => {
        async function fetchData() {
            const res = await axios.get(`/api/teams/${teamID}`).catch(({ response: caughtRes }) => caughtRes);
            setTeamRes(res);
        }
        fetchData();
    }, [teamID]);

    if (teamRes?.status === 200) {
        return <DetailedTeamView teamData={teamRes.data} />;
    } else if (teamRes?.status) {
        return <NOT_FOUND />;
    } else {
        return <div>Loading...</div>;
    }
}

export default App;
