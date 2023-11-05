import renderer from "react-test-renderer";

import ConnectionSection from "../ConnectionSection";

it("renders correctly", () => {
    const tree = renderer.create(<ConnectionSection />).toJSON();
    expect(tree).toMatchSnapshot();
});
