import renderer from "react-test-renderer";

import SingleDate from "../singleDate";

it("renders correctly", () => {
    const tree = renderer.create(<SingleDate />).toJSON();
    expect(tree).toMatchSnapshot();
});
