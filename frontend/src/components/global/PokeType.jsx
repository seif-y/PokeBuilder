import React from "react";
import styles from "./PokeType.module.css";

/**
 * Small icon representing an elemental type.
 * @param typeName: A string that is one of the 18 Pokemon types
 * @param onClick: An optional argument function that is run on click
 */
export default function PokeType({ typeName, onClick, size }) {
    const getGradientFormat = ([p0, p20, p40, p60, p80, p100]) =>
        `linear-gradient(225deg,${p0} 0%, ${p20} 20%, ${p40} 40%, ${p60} 60%, ${p80} 80%, ${p100} 100%`;

    const bgColours = {
        bug: ["#b4d469", "#a7cb58", "#9ac34a", "#8fbb40", "#82ae3a", "#74a134"],
        dark: ["#8d878d", "#817a82", "#746d77", "#6d6670", "#645e68", "#5c5761"],
        dragon: ["#7f99cc", "#738ac2", "#677eb6", "#6375ad", "#616a9d", "#61628b"],
        electric: ["#f8de58", "#f3d640", "#efcd2a", "#e6c325", "#d7b421", "#c7a41e"],
        fairy: ["#f5bbea", "#f1aee4", "#eb9bd9", "#e490d0", "#d481bf", "#c777b0"],
        fighting: ["#e07f65", "#d96d55", "#d25f48", "#cb5742", "#bf4f3a", "#b04834"],
        fire: ["#f89d5d", "#f68e49", "#f47f3d", "#ee7334", "#e0652a", "#ce5823"],
        flying: ["#9dc2f0", "#8fb7eb", "#7fade7", "#76a4e1", "#6b96d3", "#6287c2"],
        ghost: ["#9c88cd", "#9077c3", "#866bba", "#7f64b4", "#775baa", "#6e539d"],
        grass: ["#93dc74", "#81d662", "#72cd56", "#69c351", "#5fb74b", "#55a644"],
        ground: ["#e3bd6a", "#dbb05c", "#d4a34f", "#cc9948", "#be8d42", "#af803c"],
        ice: ["#94e3e8", "#83dbe2", "#75d4dc", "#6acad5", "#59bac8", "#50aab9"],
        normal: ["#c6c9bb", "#babfae", "#b0b6a4", "#a7ae9b", "#9aa18f", "#8e9383"],
        poison: ["#ce88cb", "#c577c4", "#bb68bd", "#b260b6", "#a458ab", "#944f9f"],
        psychic: ["#f691b4", "#f280aa", "#ef739e", "#e86997", "#da5e8d", "#c95583"],
        rock: ["#c9bb7c", "#c2b16e", "#b9a663", "#b09d5c", "#a39051", "#948249"],
        steel: ["#aabfc8", "#9cb3c0", "#8da6b5", "#829cad", "#7791a2", "#6c8494"],
        water: ["#76baf0", "#64acee", "#549feb", "#4b95e4", "#4088d8", "#397cca"],
    };

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
    let sizeStyle;

    // Check that input typeName is valid
    if (!bgColours.hasOwnProperty(typeName)) {
        return null;
    }

    // Set the size of the component
    if (size && sizeStyles.hasOwnProperty(size)) {
        sizeStyle = sizeStyles[size.toLowerCase()];
    } else {
        // Default to medium size
        sizeStyle = sizeStyles["medium"];
    }

    return (
        <div
            className={styles.container}
            style={{ background: getGradientFormat(bgColours[typeName]), ...sizeStyle }}
            role="button"
            onClick={onClick}
        >
            <span>{(shortenedTypeName[typeName] || typeName).toUpperCase()}</span>
        </div>
    );
}