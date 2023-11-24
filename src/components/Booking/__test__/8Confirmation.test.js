import renderer from "react-test-renderer";

import Confirmation from "../8Confirmation";
const user = { uid: "111" };
it("renders correctly", () => {
    const tree = renderer.create(<Confirmation user={user} />).toJSON();
    expect(tree).toMatchSnapshot();
});
