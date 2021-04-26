import React from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar({ onSearch }) {
    return (
        <div className={styles.barContainer}>
            <input type="text" placeholder="Search for a pokemon's name" onKeyUp={(e) => onSearch(e.target.value)} />
            <SearchIcon className={styles.searchIcon} />
        </div>
    );
}
