import renderer from "react-test-renderer";

import TherapistProfile from "../updateTherapist";

it("renders correctly", () => {
    const tree = renderer.create(<TherapistProfile />).toJSON();
    expect(tree).toMatchSnapshot();
});
