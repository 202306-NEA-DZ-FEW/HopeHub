import renderer from "react-test-renderer";
import { useTranslation } from "next-i18next"; // Import useTranslation for mocking

import Blogs from "../Blogs";

jest.mock("next-i18next", () => ({
    // Mocking the useTranslation hook
    useTranslation: () => ({ t: (key) => key }),
}));

it("renders correctly", () => {
    // Mock blog object with a title property
    const mockBlog = { title: "Test Blog" /* other properties */ };

    // Mock onDelete and onEdit functions
    const mockOnDelete = jest.fn();
    const mockOnEdit = jest.fn();

    const tree = renderer
        .create(
            <Blogs
                onEdit={mockOnEdit}
                onDelete={mockOnDelete}
                blog={mockBlog}
            />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
