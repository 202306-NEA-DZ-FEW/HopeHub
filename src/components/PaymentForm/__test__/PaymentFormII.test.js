import renderer from "react-test-renderer";

import PaymentFormII from "../PaymentFormII";

it("renders correctly", () => {
    const tree = renderer.create(<PaymentFormII />).toJSON();
    expect(tree).toMatchSnapshot();
});
