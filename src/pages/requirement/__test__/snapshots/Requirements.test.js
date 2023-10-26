import renderer from "react-test-renderer";

import Requirement from "../..";

it("renders correctly", () => {
    const tree = renderer.create(<Requirement />).toJSON();
    expect(tree).toMatchSnapshot();
});
