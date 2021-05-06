import React, { useContext, useEffect, useState } from "react";
import { getPokemonInformation } from "../../../pokeapi/pokemon";
import LoadingAnimation from "../../global/LoadingAnimation";
import styles from "./PokemonDetails.module.css";
import Modal from "../../global/Modal";
import { useHistory } from "react-router-dom";
import { PokemonDataContext } from "../../../pokeapi/PokemonDataContextProvider";
import PokeType from "../../global/PokeType";
import { formatName } from "../../../util/names";
import StatChart from "./StatChart";
import { getSingleTypeColor } from "../../../util/types";


export default function PokemonDetails({name}) {
    const [showModal, setShowModal] = useState(true);
    const history = useHistory();

    // Go back to the Pokedex page when clicking outside the modal
    function handleOnCancel() {
        history.push("/pokedex");
        setShowModal(false)
    }

    const [thisPokemon, setThisPokemon] = useState(null);
    let allPokemonViews = useContext(PokemonDataContext)
    useEffect(() => {
        setThisPokemon(allPokemonViews ? allPokemonViews.find(pkmn => pkmn.name === name) : null)
    }, [allPokemonViews, name])

    let capitalisedName = formatName(name);

    let topBarContent;
    if (!thisPokemon) {
        topBarContent = (
            <div className={styles.centerContent}>
                <LoadingAnimation />
            </div>
        )
    } else {
        topBarContent = (
            <div className={styles.content}>
                <img
                    className={styles.sprite}
                    src={thisPokemon.sprite}
                    alt={`Pokémon #${thisPokemon.id}`}
                />
                <div className={styles.bgCircle} />
                <div className={styles.pokeTitleContainer}>
                    <div className={styles.nameAndIdContainer}>
                        <span className={styles.name}>{capitalisedName}</span>
                        <div className={styles.idContainer}>
                            <span className={styles.id}>{`#${thisPokemon.id}`}</span>
                        </div>
                    </div>

                    <div className={styles.types}>
                        <PokeType typeName={thisPokemon.types[0]} />
                        {thisPokemon.types[1] ? <PokeType typeName={thisPokemon.types[1]} /> : null}
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Modal
                show={showModal}
                dismissOnClickOutside
                onCancel={() => handleOnCancel()}
                titleBarChildren={
                    <div className={styles.topBar}>{topBarContent}</div>
                }
            >
                <PokemonDescription name={name} firstType={thisPokemon ? thisPokemon.types[0] : null}/>
            </Modal>
        </div>
    );
}


function PokemonDescription({name, firstType}) {
    let pokemon = {}

    const [pokemonInfo, setPokemonInfo] = useState(null);

    useEffect(() => {
        const updatePokemonInfo = async () => {
            pokemon = await getPokemonInformation(name);
            setPokemonInfo(pokemon);
        };
        updatePokemonInfo();
    }, [name]);

    let color;
    color = firstType ? getSingleTypeColor(firstType) : "#aaaaaa"

    if (pokemonInfo) {
        return (
            <div className={styles.bottomContentContainer}>
                <div className={styles.subHeader}>Description</div>
                <div className={styles.description}>
                    <p>{pokemonInfo.description}</p>
                </div>
                <div className={styles.subHeader}>Base Stats</div>
                <div className={styles.statChartContainer}>
                    <StatChart stats={pokemonInfo.baseStats} size={240} color={color}/>
                </div>
            </div>
        );
    } else {
        return <div className={styles.centerContent}>
            <LoadingAnimation />
        </div>
    }
}
