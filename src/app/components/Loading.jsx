"use client";
import { useEffect } from "react";
import { PacmanLoader } from "react-spinners";
import { useScan } from "./WebScanContext";
import LoadingInsights from "./LoadingInsights";
import { SYSTEM_MESSAGES } from "../constants/messages";

export default function Loading({ onNext }) {
  const { scanData, updateScanData, STEPS, setCurrentStep } = useScan();

  useEffect(() => {
    getWebData();
    scanWebPhones();
  }, []);

  const scanWebPhones = async () => {
    try {
      const savePhones = await fetch("/api/scanp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: scanData.url,
        }),
      });
    } catch (error) {console.log(error);
    }
  };

  const getWebData = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 90000);

    try {
      const fetchData = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: scanData.url,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (!fetchData.ok) {
        throw {
          status: fetchData.status,
        };
      }

      const data = await fetchData.json();
      updateScanData({ metrics: data.scores });

      // Save sessionId
      sessionStorage.setItem("reportSessionId", data.sessionId);

      onNext();
    } catch (error) {
      if (error.name === "AbortError") {
        updateScanData({ errorMsg: SYSTEM_MESSAGES.FAILED_SCAN });
        setCurrentStep(STEPS.FAILED_SCAN);
      } else if (error.status === 500) {      
        updateScanData({ errorMsg: SYSTEM_MESSAGES.SITE_FAILED_SCAN });
        setCurrentStep(STEPS.FAILED_SCAN);
      } else if (error.status === 429) {
        updateScanData({ errorMsg: SYSTEM_MESSAGES.RATE_LIMIT });
        setCurrentStep(STEPS.FAILED_SCAN);
      } else {
        updateScanData({ errorMsg: SYSTEM_MESSAGES.DEFAULT_FAILED_SCAN });
        setCurrentStep(STEPS.FAILED_SCAN);
      }
    } finally {
      clearTimeout(timeoutId);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center gap-10 text-white text-xl mt-20">
      <h2>הקסם קורה!</h2>
      <PacmanLoader color="#4BBAEA" loading={true} size={50} />
      <p className="text-center">
        אנחנו מקבלים כל פיקסל על האתר שלכם כדי לתת לכם את התובנות הכי מדויקות!
      </p>
      <p className="text-2xl text-center">שווה לדעת 💡</p>
      <LoadingInsights />
    </section>
  );
}
