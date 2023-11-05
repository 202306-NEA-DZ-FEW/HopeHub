import renderer from "react-test-renderer";

import TeamCard from "../TeamCard";

it("renders correctly", () => {
    const tree = renderer.create(<TeamCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
