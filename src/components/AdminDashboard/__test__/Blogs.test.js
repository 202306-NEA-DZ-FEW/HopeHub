import renderer from "react-test-renderer";

import Blogs from "../Blogs";

it("renders correctly", () => {
    const tree = renderer.create(<Blogs />).toJSON();
    expect(tree).toMatchSnapshot();
});
