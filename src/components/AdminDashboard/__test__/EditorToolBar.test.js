import renderer from "react-test-renderer";

import EditorToolBar from "../EditorToolBar";

it("renders correctly", () => {
    const tree = renderer.create(<EditorToolBar />).toJSON();
    expect(tree).toMatchSnapshot();
});
