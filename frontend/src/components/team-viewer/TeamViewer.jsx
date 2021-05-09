import styles from "./TeamViewer.module.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { getToken, getAuthConfig, getUserID } from "../../util/auth";
import { AuthContext } from "../../App.js";
import { PokemonDataContext } from "../../pokeapi/PokemonDataContextProvider";
import DetailedTeamView from "./detailed-team-view/DetailedTeamView";
import LoadingAnimation from "../global/LoadingAnimation";
import TeamView from "./TeamView";
import NOT_FOUND from "../global/NOT_FOUND";
import TopBar from "../global/TopBar";

export default function TeamViewer() {
    const [loggedIn] = useContext(AuthContext);
    const allPokemonViews = useContext(PokemonDataContext);

    /* All the data that's needed to render a TeamView component is fetched here */
    const [teamViews, setTeamViews] = useState([]);

    async function fetchAndSetTeamViews() {
        if (allPokemonViews) {
            const teamViews = (await axios.get("/api/teams")).data;
            teamViews.forEach((teamView) => {
                teamView.party = teamView.party.map((pokemon) => {
                    const pokemonView = allPokemonViews.find((element) => element.id === pokemon.pokemonID);
                    return Object.assign({}, pokemon, pokemonView);
                });
            });
            setTeamViews(teamViews);
        }
    }

    useEffect(() => {
        fetchAndSetTeamViews();
        // eslint-disable-next-line
    }, [loggedIn, allPokemonViews]);

    /* We highlight upvotes by detecting whether a teamID is included in upvotedTeams */
    const [upvotedTeams, setUpvotedTeams] = useState([]);

    async function fetchAndSetUpvotedTeams(token) {
        const userID = getUserID(token);
        const USER_ENDPOINT = `/api/users/${userID}`;
        const res = await axios.get(USER_ENDPOINT, getAuthConfig(token));
        setUpvotedTeams(res.data.upvotedTeams);
    }

    useEffect(() => {
        if (loggedIn) {
            const token = getToken();
            fetchAndSetUpvotedTeams(token);
        } else {
            setUpvotedTeams([]);
        }
    }, [loggedIn]);

    async function handleOnVote(isUpvoted, teamID) {
        const UPVOTE_ENDPOINT = `/api/teams/${teamID}/upvotes`;
        const token = getToken();
        if (token) {
            const body = { increment: isUpvoted };
            await axios.patch(UPVOTE_ENDPOINT, body, getAuthConfig(token));
            fetchAndSetUpvotedTeams(token); // renders the highlights
            fetchAndSetTeamViews(); // gets the upvotes fresh from the server
        }
    }

    function IdentifyTeamView() {
        const { id: teamID } = useParams();

        if (teamViews.length === 0) {
            return null;
        }

        const index = teamViews.findIndex(({ _id }) => _id === teamID);
        if (index === -1) {
            return <NOT_FOUND />;
        }

        return (
            <DetailedTeamView
                teamData={teamViews[index]}
                onVote={handleOnVote}
                isUpvoted={upvotedTeams.includes(teamID)}
                upvotes={teamViews[index].upvotes}
            />
        );
    }

    return (
        <>
            <TopBar title="TEAMS" />

            {allPokemonViews ? (
                <div className={styles.outerWrapper}>
                    <Switch>
                        <Route path="/teams/:id">
                            <IdentifyTeamView />
                        </Route>
                        <Route>
                            <div className={styles.wrapper}>
                                {teamViews.map((teamView) => (
                                    <TeamView
                                        key={teamView._id}
                                        teamData={teamView}
                                        onVote={handleOnVote}
                                        isUpvoted={upvotedTeams.includes(teamView._id)}
                                        upvotes={teamView.upvotes}
                                    />
                                ))}
                            </div>
                        </Route>
                    </Switch>
                </div>
            ) : (
                <div className={styles.centerContent}>
                    <LoadingAnimation />
                </div>
            )}
        </>
    );
}
