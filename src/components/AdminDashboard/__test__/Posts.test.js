import renderer from "react-test-renderer";

import Posts from "../Posts";

it("renders correctly", () => {
    const tree = renderer.create(<Posts />).toJSON();
    expect(tree).toMatchSnapshot();
});
