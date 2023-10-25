import renderer from "react-test-renderer";
import "./matchMedia.mock";

import BlogsCarousel from "../BlogsCarousel";

it("renders correctly", () => {
    const tree = renderer.create(<BlogsCarousel />).toJSON();
    expect(tree).toMatchSnapshot();
});
