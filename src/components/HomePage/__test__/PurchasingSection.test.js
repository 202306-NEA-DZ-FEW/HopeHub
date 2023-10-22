import renderer from "react-test-renderer";

import PurchasingSection from "../PurchasingSection";

it("renders correctly", () => {
    const tree = renderer.create(<PurchasingSection />).toJSON();
    expect(tree).toMatchSnapshot();
});
