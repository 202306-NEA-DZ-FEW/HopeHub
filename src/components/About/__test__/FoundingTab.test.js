import renderer from "react-test-renderer";

import FoundingCard from "../FoundingTab";

it("renders correctly", () => {
    const tree = renderer.create(<FoundingCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
