import renderer from "react-test-renderer";
import "./matchMedia.mock";

import BlogsCarousel from "../BlogsCarousel";

const mockBlogs = [
    {
        id: 1,
        title: "Blog 1",
        subTitle: "Subtitle 1",
        imageURL: "/imageURL1.jpg",
    },
    {
        id: 2,
        title: "Blog 2",
        subTitle: "Subtitle 2",
        imageURL: "/imageURL2.jpg",
    },
    {
        id: 3,
        title: "Blog 3",
        subTitle: "Subtitle 3",
        imageURL: "/imageURL3.jpg",
    },
    {
        id: 4,
        title: "Blog 4",
        subTitle: "Subtitle 4",
        imageURL: "/imageURL4.jpg",
    },
    {
        id: 5,
        title: "Blog 5",
        subTitle: "Subtitle 5",
        imageURL: "/imageURL5.jpg",
    },
    {
        id: 6,
        title: "Blog 6",
        subTitle: "Subtitle 6",
        imageURL: "/imageURL6.jpg",
    },
];

it("renders correctly", () => {
    const tree = renderer.create(<BlogsCarousel blogs={mockBlogs} />).toJSON();
    expect(tree).toMatchSnapshot();
});
