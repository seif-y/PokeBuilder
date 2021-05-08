import { formatName } from "../../../util/names";
import PokeType from "../../global/PokeType";
import Body from "../util/style-components/Body";
import ShadowedBox from "../util/style-components/ShadowedBox";
import styles from "./ImmutableTeamMember.module.css";

function PokemonTypes({ types }) {
    return (
        <div className={styles.typeContainer}>
            {types.map((type, index) => (
                <PokeType key={index} onClick={() => {}} size="small" typeName={type} />
            ))}
        </div>
    );
}

/**
 * Similar to TeamMember except it does no fetching
 * Instead we hand it all the props it needs
 */
export default function ImmutableTeamMember({ name, notes, sprite, types }) {
    return (
        <ShadowedBox classes={`flex ${styles.immutableTeamMember}`}>
            <img src={sprite} alt={name} className={styles.pokemonSprite} />
            <div className={styles.pokemonInfo}>
                <h3 className={styles.pokemonName}>{formatName(name)}</h3>
                <PokemonTypes types={types} />
                <Body>{notes}</Body>
            </div>
        </ShadowedBox>
    );
}
