"use client";
import dynamic from "next/dynamic";
import InitialStep from "./components/InitialStep";
import { AnimatePresence, motion } from "framer-motion";
import { useScan } from "./components/WebScanContext";
const Terms = dynamic(() => import("./components/Terms"));
const Loading = dynamic(() => import("./components/Loading"));
const MetricsStep = dynamic(() => import("./components/MetricsStep"));
const FailedScan = dynamic(() => import("./components/FailedScan"));
const SurveyStep = dynamic(() => import("./components/SurveyStep"));
const PersonalDetails = dynamic(() => import("./components/PersonalDetails"));
const SuccessScreen = dynamic(() => import("./components/SuccessScreen"));
const SurveySuccess = dynamic(() => import("./components/SurveySuccess"));


export default function Home() {
  const { currentStep, setCurrentStep, STEPS } = useScan();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {(() => {
          switch (currentStep) {
            case STEPS.INITIAL:
              return <InitialStep onNext={() => setCurrentStep(STEPS.TERMS)} />;
            case STEPS.TERMS:
              return <Terms onNext={() => setCurrentStep(STEPS.LOADING)} />;
            case STEPS.LOADING:
              return <Loading onNext={() => setCurrentStep(STEPS.METRICS)} />;
            case STEPS.METRICS:
              return (
                <MetricsStep
                  onNext={() => setCurrentStep(STEPS.PERSONALDETAILS)}
                  onInit={() => setCurrentStep(STEPS.INITIAL)}
                />
              );
            case STEPS.SURVEY:
              return (
                <SurveyStep onNext={() => setCurrentStep(STEPS.SURVEY_SUCCESS)}/>
              );
            case STEPS.PERSONALDETAILS:
              return (
                <PersonalDetails
                  onNext={() => setCurrentStep(STEPS.SUCCESS_SCREEN)}
                />
              );
            case STEPS.SUCCESS_SCREEN:
              return (
                <SuccessScreen
                  onNext={() => setCurrentStep(STEPS.SURVEY)}
                  onInit={() => setCurrentStep(STEPS.INITIAL)}
                />
              );

            case STEPS.SURVEY_SUCCESS:
              return (
                <SurveySuccess onInit={() => setCurrentStep(STEPS.INITIAL)} />
              );

            case STEPS.FAILED_SCAN:
              return (
                <FailedScan onInit={() => setCurrentStep(STEPS.INITIAL)} />
              );
            default:
              return <InitialStep />;
          }
        })()}
      </motion.div>
    </AnimatePresence>
  );
}
