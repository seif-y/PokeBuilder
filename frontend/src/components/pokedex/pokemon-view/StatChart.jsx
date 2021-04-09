import RadarChart from "react-svg-radar-chart";
import "react-svg-radar-chart/build/css/index.css";

const MAX_BASE_STAT_VALUE = 255;

export default function StatChart({ stats }) {
    const statPercentages = {};
    const statCaptions = {};
    Object.keys(stats).forEach((statName, index) => {
        statPercentages[statName] = stats[statName] / MAX_BASE_STAT_VALUE;
        statCaptions[statName] = `${statName} - ${stats[statName]}`;
    });

    return <RadarChart captions={statCaptions} data={[{ data: statPercentages }]} />;
}
