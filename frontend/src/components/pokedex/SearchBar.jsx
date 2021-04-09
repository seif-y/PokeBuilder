import React from "react";

export default function SearchBar({ onSearch }) {

    return (
        <div>
            <input type="text"
                   placeholder="Search"
                   onKeyUp={e => onSearch(e.target.value)} />
        </div>

    );
}


