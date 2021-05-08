import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export default function Modal({ dismissOnClickOutside, onCancel, children, show, titleBarChildren }) {
    const [domReady, setDomReady] = React.useState(false);

    React.useEffect(() => {
        setDomReady(true);
    });

    if (!show) {
        return null;
    }

    const modalRoot = document.querySelector("#modal-root");

    return domReady
        ? ReactDOM.createPortal(
              <div
                  className={styles.modalContainerBg}
                  aria-hidden="true"
                  onClick={(e) => {
                      if (dismissOnClickOutside && e.target.parentElement === modalRoot && onCancel) {
                          onCancel();
                      }
                  }}
              >
                  <div className={styles.modalContainer}>
                      <div className={styles.titleBar}>{titleBarChildren}</div>
                      <div className={styles.content}>{children}</div>
                  </div>
              </div>,
              modalRoot
          )
        : null;
}
