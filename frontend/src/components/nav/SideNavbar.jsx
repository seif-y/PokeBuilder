import React from "react";
import styles from "./SideNavbar.module.css";
import { NavLink } from "react-router-dom";

export default function SideNavbar() {
    return (
        <div className={styles.navbar}>
            <p>Placeholder for now</p>
            <NavLink to="/pokedex">DEX</NavLink>
            <NavLink to="/teams">TEAMS</NavLink>
        </div>
    );
}
