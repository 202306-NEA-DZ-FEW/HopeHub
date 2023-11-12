import renderer from "react-test-renderer";

import ProtectedRoute from "../ProtectedRoute";

it("renders correctly", () => {
    const tree = renderer.create(<ProtectedRoute />).toJSON();
    expect(tree).toMatchSnapshot();
});
