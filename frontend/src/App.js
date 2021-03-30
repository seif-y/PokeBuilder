import "./App.css";
import SideNavbar from "./components/nav/SideNavbar";
import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="root">
                <SideNavbar />
                <div className="main-content">
                    <Switch>
                        <Route path="/pokedex">
                            <div>look at all these pokemon</div>
                        </Route>
                        <Route path="/teams">
                            <div>build your team</div>
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
