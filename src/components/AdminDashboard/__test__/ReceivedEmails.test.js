import renderer from "react-test-renderer";

import ReceivedEmails from "../ReceivedEmails";

const mockEmails = [
    {
        id: 1,
        data: {
            Name: "John Doe",
            Email: "john@example.com",
            ContactType: "General",
            Details: "This is a test email.",
            archived: false,
        },
    },
    {
        id: 2,
        data: {
            Name: "Jane Smith",
            Email: "jane@example.com",
            ContactType: "Sales",
            Details: "Another test email.",
            archived: true,
        },
    },
    // Add more mock emails as needed for testing different scenarios
];

it("renders correctly", () => {
    const tree = renderer
        .create(<ReceivedEmails emails={mockEmails} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
