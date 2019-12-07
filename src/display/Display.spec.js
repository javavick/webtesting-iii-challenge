import React from "react";
import { render } from "@testing-library/react";
import "jest-dom/extend-expect.js";
import Display from "./Display.js";

test("Display.js renders correctly", () => {
  expect(render(<Display />)).toMatchSnapshot();
});

test("Gate is unlocked and open by default", () => {
  const { getByText } = render(<Display />);

  expect(getByText("Unlocked")).toBeInTheDocument();
  expect(getByText("Open")).toBeInTheDocument();
});

test("Gate is unlocked and opened if locked and closed = false", () => {
  const { getByText } = render(<Display locked={false} closed={false} />);

  expect(getByText("Unlocked")).toBeInTheDocument();
  expect(getByText("Open")).toBeInTheDocument();
});

test("Gate is locked and closed if locked and closed = true", () => {
  const { getByText } = render(<Display locked={true} closed={true} />);

  expect(getByText("Locked")).toBeInTheDocument();
  expect(getByText("Closed")).toBeInTheDocument();
});

test("The class 'red-led' is used when the Gate is closed or locked", () => {
  const { getByText } = render(<Display locked={true} closed={true} />);

  expect(getByText("Locked").classList.contains("red-led")).toBe(true);
  expect(getByText("Closed").classList.contains("red-led")).toBe(true);
});

test("The class 'green-led' is used when the Gate is unlocked or open", () => {
  const { getByText } = render(<Display locked={false} closed={false} />);

  expect(getByText("Unlocked").classList.contains("green-led")).toBe(true);
  expect(getByText("Open").classList.contains("green-led")).toBe(true);
});
