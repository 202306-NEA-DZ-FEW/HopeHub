import renderer from "react-test-renderer";

import Description from "../6Description";

it("renders correctly", () => {
    const tree = renderer.create(<Description />).toJSON();
    expect(tree).toMatchSnapshot();
});
