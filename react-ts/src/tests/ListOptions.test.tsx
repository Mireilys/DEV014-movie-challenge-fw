import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // Importar jest-dom para tener acceso a los matchers extendidos como toBeInTheDocument
import ListOptions from "../components/ListOptions";

describe("ListOptions", () => {
  const options = [
    { value: "1", label: "Option 1" },
    { value: "2", label: "Option 2" },
    { value: "3", label: "Option 3" },
  ];

  it("debería mostrar las opciones correctamente", () => {
    const { getByText } = render(
      <ListOptions
        options={options}
        selectedOption={null}
        onChange={() => {}}
        onClear={() => {}}
      />
    );

    options.forEach((option) => {
      expect(getByText(option.label)).toBeInTheDocument();
    });
  });

  it("debería llamar a onChange cuando se selecciona una opción", () => {
    const onChangeMock = jest.fn();
    const { getByRole } = render(
      <ListOptions
        options={options}
        selectedOption={null}
        onChange={onChangeMock}
        onClear={() => {}}
      />
    );

    fireEvent.change(getByRole("combobox"), { target: { value: "1" } });

    expect(onChangeMock).toHaveBeenCalledWith(options[0]);
  });

  it("debería llamar a onClear cuando se hace clic en el botón de borrar", () => {
    const onClearMock = jest.fn();
    const { getByText } = render(
      <ListOptions
        options={options}
        selectedOption={options[0]}
        onChange={() => {}}
        onClear={onClearMock}
      />
    );

    fireEvent.click(getByText("Clear Selection"));

    expect(onClearMock).toHaveBeenCalled();
  });
});
