jest.mock("d3");

import renderer from "react-test-renderer";

import Pie from "../Pie";

it("renders correctly", () => {
    const tree = renderer.create(<Pie />).toJSON();
    expect(tree).toMatchSnapshot();
});
