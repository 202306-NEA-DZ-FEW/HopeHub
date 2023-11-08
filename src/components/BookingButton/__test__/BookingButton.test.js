import renderer from "react-test-renderer";
import BookingButton from "../BookingButton";

it("renders correctly", () => {
    const tree = renderer
        .create(
            <BookingButton
                destination='/booking'
                buttonText='Book An Appointment'
            />
        )
        .toJSON();
    expect(tree).toMatchSnapshot();
});
