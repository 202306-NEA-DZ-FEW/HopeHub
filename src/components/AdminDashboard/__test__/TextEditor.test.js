import renderer from "react-test-renderer";

import TextEditor from "../TextEditor";

it("renders correctly", () => {
    const tree = renderer.create(<TextEditor />).toJSON();
    expect(tree).toMatchSnapshot();
});
