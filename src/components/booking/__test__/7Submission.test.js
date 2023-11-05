import renderer from "react-test-renderer";

import Submission from "../7Submission";

it("renders correctly", () => {
    const tree = renderer.create(<Submission />).toJSON();
    expect(tree).toMatchSnapshot();
});
