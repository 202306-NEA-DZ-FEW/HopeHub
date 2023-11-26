import renderer from "react-test-renderer";

import TranslationButton from "../TranslationButton";

it("renders correctly", () => {
    const tree = renderer.create(<TranslationButton />).toJSON();
    expect(tree).toMatchSnapshot();
});
