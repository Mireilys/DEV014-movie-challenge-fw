import React from "react";
import styles from "../styles/ListOptions.module.css";

interface Option {
  value: string;
  label: string;
}

interface ListOptionsProps {
  options: Option[];
  selectedOption: Option | null;
  onChange: (option: Option) => void;
  onClear: () => void;
  label: string;
}

const ListOptions: React.FC<ListOptionsProps> = ({
  options,
  selectedOption,
  onChange,
  onClear,
  label, // Destructurar el prop `label`
}) => {
  return (
    <div className={styles["list-options"]}>
      <div className={styles["list-options-container"]}>
        <select
          id={styles["list-options-select"]}
          value={selectedOption?.value || ""}
          onChange={(e) => {
            const selected = options.find(
              (option) => option.value === e.target.value
            );
            if (selected) {
              onChange(selected);
            }
          }}
          className={styles["list-options-select"]}
          aria-label={label} // o usa title={label}
        >
          <option value="" disabled>
            {label}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {selectedOption && (
          <button
            onClick={onClear}
            className={styles["list-options-clear-button"]}
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};
export default ListOptions;
