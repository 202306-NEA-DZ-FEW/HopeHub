import renderer from "react-test-renderer";

import SingleDate from "../SingleDate";

it("renders correctly", () => {
    const tree = renderer.create(<SingleDate />).toJSON();
    expect(tree).toMatchSnapshot();
});
