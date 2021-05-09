import React, { useState, useContext } from "react";
import styles from "./LoginForm.module.css";
import axios from "axios";
import { AuthContext } from "../../../App";
import Button from "../Button";

export default function LoginForm({ onComplete }) {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState("");
    const [, setLoggedIn] = useContext(AuthContext);

    function logIn() {
        axios
            .post("/api/users/login", { username, password })
            .then((res) => {
                if (res.data.success) {
                    localStorage.setItem("pokebuilderAuthToken", res.data.token);
                    setLoggedIn(true);
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
            <Button text="Log In" onClick={() => logIn()} />
            <Button text="Sign Up" onClick={() => signUp()} color="white" />

            <div className={styles.errMsg}>{errorMessage}</div>
        </div>
    );
}
