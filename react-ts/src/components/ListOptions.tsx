import React from "react";

interface Option {
  value: string;
  label: string;
}

interface ListOptionsProps {
  options: Option[];
  selectedOption: Option | null;
  onChange: (option: Option) => void;
  onClear: () => void;
}

const ListOptions: React.FC<ListOptionsProps> = ({
  options,
  selectedOption,
  onChange,
  onClear,
}) => {
  return (
    <div className="list-options">
      <label htmlFor="list-options-select">Select an option:</label>
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
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {selectedOption && <button onClick={onClear}>Clear Selection</button>}
    </div>
  );
};

export default ListOptions;
