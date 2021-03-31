import React from "react";
import styles from "./SideNavbar.module.css";
import { NavLink } from "react-router-dom";
import NavbarIcon from "./NavbarIcon";

export default function SideNavbar() {
    return (
        <div className={styles.navbar}>
            <NavLink to="/pokedex">
                <NavbarIcon imageName="demo.png" />
            </NavLink>
            <NavLink to="/teams">
                <NavbarIcon imageName="demo.png" />
            </NavLink>
        </div>
    );
}
