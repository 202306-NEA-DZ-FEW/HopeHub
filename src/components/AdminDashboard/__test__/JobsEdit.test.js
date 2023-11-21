import renderer from "react-test-renderer";

import JobsEdit from "../JobsEdit";

it("renders correctly", () => {
    const tree = renderer.create(<JobsEdit />).toJSON();
    expect(tree).toMatchSnapshot();
});
