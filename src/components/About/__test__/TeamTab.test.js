import renderer from "react-test-renderer";
import Abdelghani from "../../../../public/assets/Team/Abdelghani.jpg";

import TeamCard from "../TeamTab";

// Sample team members data for testing
const mockTeamMembers = [
    {
        name: "John Doe",
        image: Abdelghani,
        linkedin: "https://www.linkedin.com/in/johndoe/",
        github: "https://github.com/johndoe",
    },
    {
        name: "Jane Smith",
        image: Abdelghani,
        linkedin: "https://www.linkedin.com/in/janesmith/",
        github: "https://github.com/janesmith",
    },
    // Add more members as needed
];

// Your test case using the mock data
it("renders correctly", () => {
    const tree = renderer
        .create(<TeamCard teamMembers={mockTeamMembers} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
