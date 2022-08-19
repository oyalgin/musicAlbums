import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import axiosMock from "axios";
import App from "../App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { reducers } from "../reducers/index";

const renderWithRedux = (
  component,
  { initialState, store = createStore(reducers, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store
  };
};

test("when api doent work screen shows error", () => {
  const { getByText } = renderWithRedux(<App />);
});

it("should display a loading text", () => {
  const { getByTestId } = render(<App />);

  expect(getByTestId("loading")).toHaveTextContent("Loading...");
});

it("should load and display the data", async () => {
  const url = "/greeting";
  const { getByTestId } = render(<App />);

  axiosMock.get.mockResolvedValueOnce({
    data: { greeting: "hello there" }
  });

  fireEvent.click(getByTestId("fetch-data"));

  const greetingData = await waitForElement(() => getByTestId("show-data"));

  expect(axiosMock.get).toHaveBeenCalledTimes(1);
  expect(axiosMock.get).toHaveBeenCalledWith(url);
  expect(greetingData).toHaveTextContent("hello there");
});
