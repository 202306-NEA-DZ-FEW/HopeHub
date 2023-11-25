import renderer from "react-test-renderer";

import UserProfile from "../UserProfile";

// Mock user data to pass as props
const mockUser = {
    name: "John Doe",
    educationLevel: "Bachelor",
    hobbies: ["Reading", "Hiking"],
    familySize: 4,
    gender: "Male",
    birthDate: "1990-05-15",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
    idcard: "ABC123XYZ",
    photoURL: "https://example.com/profile.jpg",
    width: 30,
    // Add other properties as needed for your UserProfile component
};

it("renders correctly", () => {
    const tree = renderer.create(<UserProfile user={mockUser} />).toJSON();
    expect(tree).toMatchSnapshot();
});
