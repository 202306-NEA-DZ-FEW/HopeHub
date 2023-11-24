import renderer from "react-test-renderer";

import EventModal from "../EventModal";

jest.mock("@/components/CalendarEvents/EventModal", () => {
    // Return a function, not an object
    return function MockedEventModal() {
        return <div />;
    };
});

it("renders correctly", () => {
    const tree = renderer.create(<EventModal />).toJSON();
    expect(tree).toMatchSnapshot();
});
