import renderer from "react-test-renderer";

import TeamCard from "../TeamTab";

it("renders correctly", () => {
    const tree = renderer.create(<TeamCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
