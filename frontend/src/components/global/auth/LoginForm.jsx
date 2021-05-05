import React, { useState, useContext } from "react";
import { Button } from "@material-ui/core";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { AuthContext } from "../../../App";
import { Snackbar } from "@material-ui/core";
import SnackbarMessage from "../SnackbarMessage";

export default function LoginForm({ onComplete }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [showLoginMsg, setShowLoginMsg] = useState(false);
    const [, setLoggedIn] = useContext(AuthContext);

    function logIn() {
        axios
            .post("/api/users/login", { username, password })
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem("pokebuilderAuthToken", res.data.token);
                    setLoggedIn(true);
                    setShowLoginMsg(true);
                    onComplete();
                }
            })
            .catch((err) => {
                setErrorMessage("Username or password incorrect.");
            });
    }

    function signUp() {
        axios
            .post("/api/users/register", { username, password })
            .then((res) => {
                logIn();
            })
            .catch((err) => {
                setErrorMessage(err.response.data);
            });
    }

    return (
        <div className={styles.formContainer}>
            <input
                className={styles.formInput}
                type="text"
                id="username"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
            />
            <input
                className={styles.formInput}
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button className={styles.formButton} variant="contained" color="primary" onClick={() => logIn()}>
                Log In
            </Button>
            <Button className={styles.formButton} variant="contained" color="primary" onClick={() => signUp()}>
                Sign Up
            </Button>
            <div className={styles.errMsg}>{errorMessage}</div>
            <Snackbar open={showLoginMsg} autoHideDuration={3000} onClose={() => setShowLoginMsg(false)}>
                <SnackbarMessage message="Successfully logged out" />
            </Snackbar>
        </div>
    );
}
