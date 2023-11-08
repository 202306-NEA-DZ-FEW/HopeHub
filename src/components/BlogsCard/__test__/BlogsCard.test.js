import renderer from "react-test-renderer";
import BlogsCard from "../BlogsCard";

it("renders correctly", () => {
    const tree = renderer.create(<BlogsCard />).toJSON();
    expect(tree).toMatchSnapshot();
});
