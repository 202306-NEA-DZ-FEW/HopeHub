import renderer from "react-test-renderer";

import JobCard from "../JobCard";

it("renders correctly", () => {
    const tree = renderer.create(<JobCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
