import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "jest-dom/extend-expect.js";
import Controls from "./Controls.js";

test("Controls.js renders properly", () => {
  expect(render(<Controls />)).toMatchSnapshot();
});

test("Displays Lock and Close Gate buttons", () => {
  const { getByText } = render(<Controls />);

  expect(getByText("Lock Gate")).toBeInTheDocument();
  expect(getByText("Close Gate")).toBeInTheDocument();
});

test("Displays Unlock and Open Gate buttons", () => {
  const { getByText } = render(<Controls locked={true} closed={true} />);

  expect(getByText("Unlock Gate")).toBeInTheDocument();
  expect(getByText("Open Gate")).toBeInTheDocument();
});

test("Check if toggleLocked was fired", () => {
  const toggleLockedMock = jest.fn();

  const { getByText } = render(
    <Controls toggleLocked={toggleLockedMock} locked={false} closed={true} />
  );

  const lockButton = getByText("Lock Gate");

  fireEvent.click(lockButton);
  expect(toggleLockedMock).toHaveBeenCalled();
});

test("Check if toggleClosed was fired", () => {
  const toggleClosedMock = jest.fn();

  const { getByText } = render(
    <Controls toggleClosed={toggleClosedMock} locked={false} closed={false} />
  );

  const closeButton = getByText("Close Gate");

  fireEvent.click(closeButton);
  expect(toggleClosedMock).toHaveBeenCalled();
});

test("Check if Close button is disabled if the Gate is locked", () => {
  const { getByText } = render(<Controls locked={true} />);

  expect(getByText("Close Gate")).toBeDisabled();
});

test("Check if Open button is disabled if the Gate is locked", () => {
  const { getByText } = render(<Controls locked={true} closed={true} />);

  expect(getByText("Open Gate")).toBeDisabled();
});

test("Check if Locked button is disabled if the Gate is open", () => {
  const { getByText } = render(<Controls closed={false} />);

  expect(getByText("Lock Gate")).toBeDisabled();
});

// test("");
