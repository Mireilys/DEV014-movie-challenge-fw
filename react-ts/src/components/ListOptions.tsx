import React from "react";
import "../App.css";

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
    <div className="list-options">
      <div className="list-options-container">
        <select
          id="list-options-select"
          value={selectedOption?.value || ""}
          onChange={(e) => {
            const selected = options.find(
              (option) => option.value === e.target.value
            );
            if (selected) {
              onChange(selected);
            }
          }}
          className="list-options-select"
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
          <button onClick={onClear} className="list-options-clear-button">
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};
export default ListOptions;
