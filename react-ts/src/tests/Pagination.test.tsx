import React from "react";
import ReactDOM from "react-dom";
import Pagination from "../components/Pagination";

describe("Pagination Component", () => {
  let container: HTMLDivElement | null = null;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    if (container) {
      document.body.removeChild(container);
      container = null;
    }
  });

  it('disables "Anterior" button on first page', () => {
    ReactDOM.render(
      <Pagination currentPage={1} totalPages={10} onSelectPage={() => {}} />,
      container
    );
    const prevButton = container!.querySelector(
      "button:nth-of-type(1)"
    ) as HTMLButtonElement;
    expect(prevButton.disabled).toBe(true);
  });

  it('disables "Siguiente" button on last page', () => {
    ReactDOM.render(
      <Pagination currentPage={10} totalPages={10} onSelectPage={() => {}} />,
      container
    );
    const nextButton = container!.querySelector(
      "button:nth-of-type(3)"
    ) as HTMLButtonElement;
    expect(nextButton.disabled).toBe(true);
  });

  it("calls onSelectPage correctly when a page button is clicked", () => {
    const mockSelectPage = jest.fn();
    ReactDOM.render(
      <Pagination
        currentPage={3}
        totalPages={10}
        onSelectPage={mockSelectPage}
      />,
      container
    );
    const page3Button = container!.querySelector(
      "button:nth-of-type(3)"
    ) as HTMLButtonElement;
    page3Button.click();
    expect(mockSelectPage).toHaveBeenCalledWith(3);
  });

  it("renders ellipsis correctly when totalPages > 5 and currentPage is in middle", () => {
    ReactDOM.render(
      <Pagination currentPage={5} totalPages={10} onSelectPage={() => {}} />,
      container
    );
    const ellipsisButtons = container!.querySelectorAll("button");
    let ellipsisFound = false;
    ellipsisButtons.forEach((button) => {
      if (button.textContent === "...") {
        ellipsisFound = true;
      }
    });
    expect(ellipsisFound).toBe(true);
  });
});
