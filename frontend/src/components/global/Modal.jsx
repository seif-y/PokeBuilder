import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ dismissOnClickOutside, onCancel, children, show }) {
    if (!show) {
        return null;
    }
    const modalRoot = document.querySelector("#modal-root");

    return ReactDOM.createPortal(
        <div
            className={styles.modalContainerBg}
            aria-hidden="true"
            onClick={(e) => {
                if (dismissOnClickOutside && e.target.parentElement === modalRoot && onCancel) {
                    onCancel();
                }
            }}
        >
            <div className={styles.modalContainer}>{children}</div>
        </div>,
        modalRoot
    );
}
