import renderer from "react-test-renderer";

import TotalTickets from "../TotalTickets";

it("renders correctly", () => {
    const tree = renderer.create(<TotalTickets />).toJSON();
    expect(tree).toMatchSnapshot();
});
