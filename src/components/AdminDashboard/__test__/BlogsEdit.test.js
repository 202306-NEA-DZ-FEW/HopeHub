import renderer from "react-test-renderer";

import BlogsEdit from "../BlogsEdit";

it("renders correctly", () => {
    const tree = renderer.create(<BlogsEdit />).toJSON();
    expect(tree).toMatchSnapshot();
});
// jest.mock("@/components/AdminDashboard/TextEditor", () => {
//   return {
//       TextEditor: jest.fn(() => {}),
//   };
// });
