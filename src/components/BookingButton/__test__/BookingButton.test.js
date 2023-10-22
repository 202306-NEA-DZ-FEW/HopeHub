import renderer from "react-test-renderer";

import BookingButton from "../BookingButton";

it("renders correctly", () => {
    const tree = renderer.create(<BookingButton />).toJSON();
    expect(tree).toMatchSnapshot();
});
