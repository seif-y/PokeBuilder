import { Snackbar } from "@material-ui/core";
import styles from "./SnackbarMessage.module.css";

export default function TextArea({ show, setShow, duration, message }) {
    return (
        <Snackbar open={show} autoHideDuration={duration} onClose={() => setShow(false)}>
            <div className={styles.snackbarMessage}>{message}</div>
        </Snackbar>
    );
}
