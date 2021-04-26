import { useState } from "react";
import { getAllTypes } from "../../../util/types";
import styles from "./TypeFilter.module.css";
import { FilterList as FilterIcon } from "@material-ui/icons";
import Modal from "../../global/Modal";
import PokeType from "../../global/PokeType";

const allTypes = getAllTypes();

export default function TypeFilter({ onFiltersUpdated }) {
    const [clickStates, setClickStates] = useState(Array(18).fill(false));
    const [showModal, setShowModal] = useState(false);
    const [typeFilters, setTypeFilters] = useState(new Set());

    function handleOnCancel() {
        if (onFiltersUpdated) {
            onFiltersUpdated(Array.from(typeFilters));
        }
        setShowModal(() => false);
    }

    function handleOnClick(typeFilter, index) {
        const isClicked = !clickStates[index];
        setClickStates((currentClickStates) => {
            const newCurrentStates = [...currentClickStates];
            newCurrentStates[index] = isClicked;
            return newCurrentStates;
        });
        setTypeFilters((currentTypeFilters) => {
            if (isClicked) {
                return currentTypeFilters.add(typeFilter);
            } else {
                currentTypeFilters.delete(typeFilter);
                return currentTypeFilters;
            }
        });
    }

    function handleOnRemove() {
        setClickStates((currentClickStates) => currentClickStates.map(() => false));
        setTypeFilters(() => new Set());
    }

    function PokeTypes() {
        return allTypes.map((type, index) => (
            <div key={type} className={`${styles.typeWrapper} ${clickStates[index] ? styles.typeIsClicked : ""}`}>
                <PokeType typeName={type} size="medium" onClick={(type) => handleOnClick(type, index)} />
            </div>
        ));
    }

    return (
        <>
            <FilterIcon className={styles.filter} onClick={() => setShowModal((modalIsShown) => !modalIsShown)} />
            <Modal show={showModal} dismissOnClickOutside onCancel={handleOnCancel}>
                <div className={styles.typeGrid}>
                    <div>Filter by Types</div>
                    <PokeTypes />
                    <button className={styles.leftButton} onClick={handleOnCancel}>
                        Apply Filters
                    </button>
                    <button className={styles.rightButton} onClick={handleOnRemove}>
                        Remove Filters
                    </button>
                </div>
            </Modal>
        </>
    );
}
