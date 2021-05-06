import React, { useEffect, useState } from "react";
import { getPokemonInformation } from "../../../pokeapi/pokemon";
import LoadingAnimation from "../../global/LoadingAnimation";
import styles from "./PokemonDetails.module.css";
import Modal from "../../global/Modal";
import { useHistory } from "react-router-dom";


export default function PokemonDetails({name}) {
    const [showModal, setShowModal] = useState(true);
    const history = useHistory();

    // Go back to the Pokedex page when clicking outside the modal
    function handleOnCancel() {
        history.push("/pokedex");
        setShowModal(false)
    }

    return (
        <div>
            <Modal
                show={showModal}
                dismissOnClickOutside
                onCancel={() => handleOnCancel()}
                titleBarChildren={
                    <div>{name}</div>
                }
            >
                <PokemonDescription name={name} />
            </Modal>
        </div>
    );
}


function PokemonDescription({name}) {
    let pokemon = {}

    const [pokemonInfo, setPokemonInfo] = useState(null);

    useEffect(() => {
        const updatePokemonViews = async () => {
            pokemon = await getPokemonInformation(name);
            setPokemonInfo(pokemon);
        };
        updatePokemonViews();
    }, []);

    if (pokemonInfo) {
        return (
            <div>
                <span>{pokemonInfo.description}</span>
            </div>
        );
    } else {
        return <div className={styles.centerContent}>
            <LoadingAnimation />
        </div>
    }
}
