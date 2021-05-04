import React, { useState } from "react";
import { Button } from "@material-ui/core";
import styles from "./LoginForm.module.css";
import axios from "axios";

export default function LoginForm() {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    function logIn() {
        axios.post("/api/users/login", { username, password }).then((res) => console.log(res.data));
    }

    function signUp() {
        axios.post("/api/users/register", { username, password }).then((res) => console.log(res.data));
    }

    return (
        <div className={styles.formContainer}>
            <input type="text" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
            <input type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            <Button onClick={() => logIn()}>Log In</Button>
            <Button onClick={() => signUp()}>Sign Up</Button>
        </div>
    );
}
