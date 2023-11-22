import renderer from "react-test-renderer";

import TherapistProfile from "../updateTherapist";

const user = {
    // Populate with necessary user data for testing
    name: "John Doe",
    birthDate: "1990-01-01",
    email: "johndoe@example.com",
    phoneNumber: "1234567890",
    // Add other user properties as needed
};

it("renders correctly", () => {
    const tree = renderer.create(<TherapistProfile user={user} />).toJSON();
    expect(tree).toMatchSnapshot();
});
