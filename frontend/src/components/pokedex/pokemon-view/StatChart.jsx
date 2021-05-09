import React from "react";
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

/**
 * This object is used to determine the X-position of each caption in the SVG chart.
 * Since there will always be 6 points, it is guaranteed that the first caption will be in the same positions every time.
 * For each caption, its X-position is the factor from this object, multiplied by the total size of the chart.
 */
const indexToXValue = {
    0: 0,
    1: 0.411362,
    2: 0.411362,
    3: 0,
    4: -0.411362,
    5: -0.411362,
};

const MAX_BASE_STAT_VALUE = 255;

export default function StatChart({ stats, color, size = 300 }) {
    // Object to hold value of each stat as a portion of the maximum value for a base stat.
    // Each value will be a number between 0 and 1
    const statPercentages = {};

    // The caption for each stat on the chart will be the display name, and the value for the stat.
    const statCaptions = {};

    // Set the data for use in the chart, as well as the contents of the captions.
    Object.keys(stats).forEach((statName, index) => {
        statPercentages[statName] = stats[statName] / MAX_BASE_STAT_VALUE;
        let xValue = size * indexToXValue[index];
        statCaptions[statName] = (
            <React.Fragment>
                <tspan>{displayNames[statName]}</tspan>
                <tspan dy="1em" x={xValue}>
                    {stats[statName]}
                </tspan>
            </React.Fragment>
        );
    });

    // Options that are used to configure the radar chart, more info can be seen on the react-svg-radar-chart npm package page
    const options = {
        scales: 1,
        captionProps: () => ({
            className: styles.statCaption,
            textAnchor: "middle",
        }),
        zoomDistance: 1.3,
    };

    return (
        <RadarChart
            captions={statCaptions}
            data={[{ data: statPercentages, meta: { color: color } }]}
            options={options}
            size={size}
        />
    );
}
