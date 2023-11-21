// Import useTranslation for mocking
import renderer from "react-test-renderer";

import Jobs from "../Jobs";

jest.mock("next-i18next", () => ({
    // Mocking the useTranslation hook
    useTranslation: () => ({ t: (key) => key }),
}));

it("renders correctly", () => {
    // Mock blog object with a title property
    const mockJob = { title: "Test Job" /* other properties */ };

    // Mock onDelete and onEdit functions
    const mockOnDelete = jest.fn();
    const mockOnEdit = jest.fn();

    const tree = renderer
        .create(
            <Jobs onEdit={mockOnEdit} onDelete={mockOnDelete} job={mockJob} />
        )
        .toJSON();

    expect(tree).toMatchSnapshot();
});
