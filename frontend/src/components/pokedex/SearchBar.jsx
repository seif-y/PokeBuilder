import React from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@material-ui/icons/Search";

export default function SearchBar({ onSearch }) {
    return (
        <div className={styles.barContainer}>
            <input type="text" placeholder="Search" onKeyUp={(e) => onSearch(e.target.value)} />
            <SearchIcon className={styles.searchIcon} fontSize="1.1rem" />
        </div>
    );
}
