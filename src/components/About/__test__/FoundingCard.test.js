import renderer from "react-test-renderer";

import FoundingCard from "../FoundingCard";

it("renders correctly", () => {
    const tree = renderer.create(<FoundingCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
