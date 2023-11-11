import renderer from "react-test-renderer";

import Patients from "../Patients";

it("renders correctly", () => {
    const tree = renderer.create(<Patients />).toJSON();
    expect(tree).toMatchSnapshot();
});
