import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";
import styles from "./StatChart.module.css";

// Object to store full display names for each stat
const displayNames = {
    hp: "HP",
    attack: "Attack",
    defense: "Defense",
    specialAttack: "Sp. Atk",
    specialDefense: "Sp. Def",
    speed: "Speed",
};

const MAX_BASE_STAT_VALUE = 255;

export default function StatChart({ stats, color }) {
    // Object to hold value of each stat as a portion of the maximum value for a base stat.
    // Each value will be a number between 0 and 1
    const statPercentages = {};

    // The caption for each stat on the chart will be the display name, and the value for the stat.
    const statCaptions = {};

    Object.keys(stats).forEach((statName, index) => {
        statPercentages[statName] = stats[statName] / MAX_BASE_STAT_VALUE;
        statCaptions[statName] = `${displayNames[statName]} - ${stats[statName]}`;
    });

    const options = {
        scales: 1,
        captionProps: () => ({
            className: styles.statCaption,
            textAnchor: "middle",
        }),
    };

    return (
        <RadarChart
            captions={statCaptions}
            data={[{ data: statPercentages, meta: { color: color } }]}
            options={options}
        />
    );
}
