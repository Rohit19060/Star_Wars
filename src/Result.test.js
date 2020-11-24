import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";
import Result from "./Result";

describe("Result Component", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Result name="Luke Skywalker" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders the UI as expected", () => {
    const tree = renderer.create(<Result name="Luke Skywalker" />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
