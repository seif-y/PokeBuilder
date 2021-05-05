import React from "react";
import styles from "./SideNavbar.module.css";
import { NavLink } from "react-router-dom";
import NavbarIcon from "./NavbarIcon";

export default function SideNavbar() {
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
            <div className={styles.bottomSpacer}/>
            <img
                className={`${styles.logo} ${styles.unselectable}`}
                src={`${process.env.PUBLIC_URL}/icons/logo.png`}
                alt={"Logo"}
            />
            <NavLink to="/user" activeClassName={styles.activeNavLink}>
                <NavbarIcon imageName="user.png" />
            </NavLink>
        </div>
    );
}
