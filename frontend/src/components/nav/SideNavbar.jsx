import React, { useState } from "react";
import styles from "./SideNavbar.module.css";
import { NavLink } from "react-router-dom";
import NavbarIcon from "./NavbarIcon";
import Modal from "../global/Modal";
import LoginForm from "../global/auth/LoginForm";

export default function SideNavbar() {
    const [showModal, setShowModal] = useState(false);

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
            <div onClick={() => setShowModal(true)}>
                <NavbarIcon imageName="user.png" />
            </div>
            <Modal
                className={styles.loginModal}
                show={showModal}
                dismissOnClickOutside
                onCancel={() => setShowModal(false)}
            >
                <LoginForm onComplete={() => setShowModal(false)} />
            </Modal>
        </div>
    );
}
