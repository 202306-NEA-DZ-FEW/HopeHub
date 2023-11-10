import renderer from "react-test-renderer";

import Signup from "../signup";

it("renders correctly", () => {
    const tree = renderer.create(<Signup />).toJSON();
    expect(tree).toMatchSnapshot();
});
