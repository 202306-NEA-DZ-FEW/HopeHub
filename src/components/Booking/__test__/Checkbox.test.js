import renderer from "react-test-renderer";

import Checkbox from "../Checkbox";

it("renders correctly", () => {
    const tree = renderer.create(<Checkbox />).toJSON();
    expect(tree).toMatchSnapshot();
});
