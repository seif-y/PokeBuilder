import React, { useState, useContext } from "react";
import styles from "./SideNavbar.module.css";
import { NavLink } from "react-router-dom";
import NavbarIcon from "./NavbarIcon";
import Modal from "../global/Modal";
import LoginForm from "../global/auth/LoginForm";
import { AuthContext } from "../../App";
import { Snackbar } from "@material-ui/core";

export default function SideNavbar() {
    const [showModal, setShowModal] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [showSnackbar, setShowSnackbar] = useState(false);

    const [loggedIn, setLoggedIn] = useContext(AuthContext);

    function logOut() {
        localStorage.removeItem("pokebuilderAuthToken");
        setLoggedIn(false);
        revealSnackbar("Successfully logged out");
    }

    function handleLogIn() {
        setShowModal(false);
        revealSnackbar("Successfully logged in");
    }

    function revealSnackbar(message) {
        setSnackbarMessage(message);
        setShowSnackbar(true);
    }

    function renderAccountButton() {
        if (loggedIn) {
            return (
                <div onClick={() => logOut()}>
                    <NavbarIcon imageName="logout.png" />
                </div>
            );
        } else {
            return (
                <div onClick={() => setShowModal(true)}>
                    <NavbarIcon imageName="login.png" />
                </div>
            );
        }
    }

    return (
        <div className={styles.navbar}>
            <NavLink to="/pokedex" activeClassName={styles.activeNavLink}>
                <NavbarIcon imageName="pokedex.png" />
            </NavLink>
            <NavLink to="/team-builder" activeClassName={styles.activeNavLink}>
                <NavbarIcon imageName="builder.png" />
            </NavLink>
            <NavLink to="/teams" activeClassName={styles.activeNavLink}>
                <NavbarIcon imageName="teams.png" />
            </NavLink>
            <div className={styles.bottomSpacer} />
            <img
                className={`${styles.logo} ${styles.unselectable}`}
                src={`${process.env.PUBLIC_URL}/icons/logo.png`}
                alt={"Logo"}
            />
            {renderAccountButton()}
            <Modal
                className={styles.loginModal}
                show={showModal}
                dismissOnClickOutside
                onCancel={() => setShowModal(false)}
            >
                <LoginForm onComplete={() => handleLogIn()} />
            </Modal>
            <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={() => setShowSnackbar(false)}>
                <div className={styles.snackbarMessage}>{snackbarMessage}</div>
            </Snackbar>
        </div>
    );
}
