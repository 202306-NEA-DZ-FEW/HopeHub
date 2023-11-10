import renderer from "react-test-renderer";

import Therapists from "../Therapists";

it("renders correctly", () => {
    const tree = renderer.create(<Therapists />).toJSON();
    expect(tree).toMatchSnapshot();
});
