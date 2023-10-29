import renderer from "react-test-renderer";

import ToggleButton from "../toggleBtn";

it("renders correctly", () => {
    const tree = renderer.create(<ToggleButton />).toJSON();
    expect(tree).toMatchSnapshot();
});
