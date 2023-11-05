import renderer from "react-test-renderer";

import Therapy from "../3Therapy";

it("renders correctly", () => {
    const tree = renderer.create(<Therapy />).toJSON();
    expect(tree).toMatchSnapshot();
});
