import renderer from "react-test-renderer";

import Forgot from "../Forgot";

it("renders correctly", () => {
    const tree = renderer.create(<Forgot />).toJSON();
    expect(tree).toMatchSnapshot();
});
