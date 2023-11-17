import renderer from "react-test-renderer";

import NewsletterSignUp from "../NewsletterSignUp";

it("renders correctly", () => {
    const tree = renderer.create(<NewsletterSignUp />).toJSON();
    expect(tree).toMatchSnapshot();
});
