import "./matchMedia.mock";
import renderer from "react-test-renderer";
import BlogsCarousel from "../BlogsCarousel";

it("renders correctly", () => {
    const tree = renderer.create(<BlogsCarousel />).toJSON();
    expect(tree).toMatchSnapshot();
});
