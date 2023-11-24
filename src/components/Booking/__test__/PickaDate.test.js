import renderer from "react-test-renderer";

import PickaDate from "../PickaDate";

it("renders correctly", () => {
    const tree = renderer.create(<PickaDate />).toJSON();
    expect(tree).toMatchSnapshot();
});
