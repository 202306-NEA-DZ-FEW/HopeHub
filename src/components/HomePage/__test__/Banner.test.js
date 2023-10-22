import renderer from "react-test-renderer";

import Banner from "../Banner";

it("renders correctly", () => {
    const tree = renderer.create(<Banner />).toJSON();
    expect(tree).toMatchSnapshot();
});
