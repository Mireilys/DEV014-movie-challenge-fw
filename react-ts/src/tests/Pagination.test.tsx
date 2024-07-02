// import React from "react";
// import ReactDOM from "react-dom";
// import Pagination from "../components/Pagination";
// import { render, screen, fireEvent } from "@testing-library/react";

// describe("componente de paginación", () => {
//   it("se le puede dar click a lor botones correctamente", () => {
//     render(
//       <Pagination
//         currentPage={1}
//         totalPages={6}
//         onSelectPage={() => {}}
//       ></Pagination>
//     );
//     const buttons = screen.getAllByRole("button");
//     buttons.forEach((button) => {
//       fireEvent.click(button);
//     });
//   });
// });

import React from "react";
import ReactDOM from "react-dom";
import Pagination from "../components/Pagination";
import { render, screen, fireEvent } from "@testing-library/react";

describe("componente de paginación", () => {
  it("se le puede dar click a lor botones correctamente", () => {
    render(
      <Pagination
        currentPage={1}
        totalPages={6}
        onSelectPage={() => {}}
      ></Pagination>
    );
    const buttons = screen.getAllByRole("button");
    buttons.forEach((button) => {
      fireEvent.click(button);
    });
  });
});
