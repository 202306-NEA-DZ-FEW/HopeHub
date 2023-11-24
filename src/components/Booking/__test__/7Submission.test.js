import renderer from "react-test-renderer";

import Submission from "../7Submission";

it("renders correctly", () => {
    const user = {
        totalTickets: 5, // Or any number you want for testing purposes
    };

    const tree = renderer.create(<Submission user={user} />).toJSON();
    expect(tree).toMatchSnapshot();
});
