import styles from "./TextArea.module.css";

// value is undefined by default otherwise won't work
export default function TextArea({ classes, onChange, placeholder, value = undefined }) {
    return (
        <textarea
            className={`${styles.textArea} ${classes}`}
            placeholder={placeholder}
            onClick={(e) => e.stopPropagation()}
            onChange={({ target: { value } }) => onChange(value)}
            value={value}
        />
    );
}
