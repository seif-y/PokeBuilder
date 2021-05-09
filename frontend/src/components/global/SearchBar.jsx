import React from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar({ onSearch }) {
    return (
        <div className={styles.barContainer}>
            <input
                className={styles.searchBar}
                type="text"
                placeholder="Search by Pokémon name"
                onKeyUp={(e) => onSearch(e.target.value.toLowerCase())}
            />
            <SearchIcon className={styles.searchIcon} />
        </div>
    );
}
