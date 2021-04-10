import React from "react";
import styles from "./PokeType.module.css";
import { getSolidTypeColor } from "../../util/typeColors";

/**
 * Small icon representing an elemental type.
 * @param typeName: A string that is one of the 18 Pokemon types
 * @param onClick: An optional argument function that is run on click
 * @param size: An optional string argument for either "small" or "medium" component sizes
 */
export default function PokeType({ typeName, onClick, size = "medium" }) {
    // Type names are stylized to use a max of 6 letters
    const shortenedTypeName = {
        electric: "electr",
        fighting: "fight",
        psychic: "psychc",
    };

    const sizeStyles = {
        small: { width: "55px", fontSize: "small" },
        medium: { width: "70px", fontSize: "medium" },
    };

    typeName = typeName.toLowerCase();

    let typeColor = getSolidTypeColor(typeName);

    // If the type color is not found, then the type is invalid, so return null
    if (typeColor === null) {
        return null;
    }

    let sizeStyle;

    // Set the size of the component
    if (size && sizeStyles.hasOwnProperty(size)) {
        sizeStyle = sizeStyles[size.toLowerCase()];
    }

    return (
        <div
            className={styles.container}
            style={{ background: typeColor, ...sizeStyle }}
            role="button"
            onClick={onClick}
        >
            <span>{(shortenedTypeName[typeName] || typeName).toUpperCase()}</span>
        </div>
    );
}
