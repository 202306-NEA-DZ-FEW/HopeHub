import renderer from "react-test-renderer";
import Forgot from "../forgot";

it("renders correctly", () => {
    const tree = renderer.create(<Forgot />).toJSON();
    expect(tree).toMatchSnapshot();
});
