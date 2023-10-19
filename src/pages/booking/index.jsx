import { useState } from "react";

import TypeOfCounseling from "@/components/booking/1TypeOfCounseling";
import RelationshipStatus from "@/components/booking/2RelationshipStatus";
import Therapy from "@/components/booking/3Therapy";
import CounseQualities from "@/components/booking/4CounseQualities";
import Issues from "@/components/booking/5Issues";
import Description from "@/components/booking/6Description";
import Submission from "@/components/booking/7Submission";
import Confirmation from "@/components/booking/8Confirmation";

function BookingPage() {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Initialize with default form data for each step
        TypeOfCounselingData: {},
        RelationshipStatusData: {},
        TherapyData: {},
        CounseQualitiesData: {},
        IssuesData: {},
        DescriptionData: {},
        SubmissionData: {},
        ConfirmationData: {},
    });

    const handleNext = (data) => {
        setFormData({ ...formData, [`step${currentStep}Data`]: data });
        setCurrentStep(currentStep + 1);
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <TypeOfCounseling onNext={handleNext} />;
            case 2:
                return (
                    <RelationshipStatus
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );
            case 3:
                return (
                    <Therapy onNext={handleNext} onPrevious={handlePrevious} />
                );
            case 4:
                return (
                    <CounseQualities
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                    />
                );
            case 5:
                return (
                    <Issues onNext={handleNext} onPrevious={handlePrevious} />
                );
            case 6:
                return <Description formData={formData} />;
            case 7:
                return <Submission formData={formData} />;
            case 8:
                return <Confirmation formData={formData} />;
            default:
                return null;
        }
    };

    return (
        <div>
            {renderStep()}

            {currentStep > 1 && (
                <button onClick={handlePrevious}>Previous</button>
            )}

            {currentStep < 6 && (
                <button
                    onClick={() =>
                        handleNext(formData[`step${currentStep}Data`])
                    }
                >
                    Next
                </button>
            )}
        </div>
    );
}

export default BookingPage;
