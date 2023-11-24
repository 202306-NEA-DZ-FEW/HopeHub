import renderer from "react-test-renderer";

import CounseQualities from "../4CounseQualities";

it("renders correctly", () => {
    const tree = renderer.create(<CounseQualities />).toJSON();
    expect(tree).toMatchSnapshot();
});
