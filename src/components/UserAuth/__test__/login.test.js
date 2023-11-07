import renderer from "react-test-renderer";

import Login from "../login";

it("renders correctly", () => {
    const tree = renderer.create(<Login />).toJSON();
    expect(tree).toMatchSnapshot();
});
