import renderer from "react-test-renderer";

import TypeOfCounseling from "../1TypeOfCounseling";

it("renders correctly", () => {
    const tree = renderer.create(<TypeOfCounseling />).toJSON();
    expect(tree).toMatchSnapshot();
});
