import renderer from "react-test-renderer";

import Widget from "../Widget";

it("renders correctly", () => {
    const tree = renderer.create(<Widget />).toJSON();
    expect(tree).toMatchSnapshot();
});
