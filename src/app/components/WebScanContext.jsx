"use client";
import { createContext, useContext, useState } from "react";

const STEPS = {
  INITIAL: "INITIAL",
  TERMS: "TERMS",
  LOADING: "LOADING",
  METRICS: "METRICS",
  FAILED_SCAN: "FAILED_SCAN",
  SURVEY: "SURVEY",
  PERSONALDETAILS: "PERSONALDETAILS",
  SUCCESS_SCREEN: "SUCCESS_SCREEN",
  SURVEY_SUCCESS: "SURVEY_SUCCESS",
};

const WebScanContext = createContext();

export function WebScanProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(STEPS.INITIAL);
  const [scanData, setScanData] = useState({
    url: "",
    metrics: {},
    isAcceptedTerms: false,
    errorMsg: "",
    personalDetails: null,
  });

  const updateScanData = (newData) => {
    setScanData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  const resetScanData = () => {
    updateScanData({
      url: "",
      metrics: {},
      isAcceptedTerms: false,
      errorMsg: "",
      personalDetails: null,
    })
  }

  return (
    <WebScanContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        scanData,
        updateScanData,
        STEPS,
        resetScanData
      }}
    >
      {children}
    </WebScanContext.Provider>
  );
}

export function useScan() {
  return useContext(WebScanContext);
}
