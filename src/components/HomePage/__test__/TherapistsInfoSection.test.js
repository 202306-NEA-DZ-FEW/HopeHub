import renderer from "react-test-renderer";

import TherapistsInfoSection from "../TherapistsInfoSection";

it("renders correctly", () => {
    const tree = renderer.create(<TherapistsInfoSection />).toJSON();
    expect(tree).toMatchSnapshot();
});
