jest.mock("d3");

import renderer from "react-test-renderer";

import Bar from "../Bar";

it("renders correctly", () => {
    const tree = renderer.create(<Bar />).toJSON();
    expect(tree).toMatchSnapshot();
});
