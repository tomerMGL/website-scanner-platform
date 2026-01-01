import MetricItem from "./MetricItem";
import { useScan } from "./WebScanContext";

export default function MetricsStep({ onNext, onInit }) {
  const { scanData, updateScanData } = useScan();

  const toPersonalDetails = async () => {
    onNext();
  };

  const initPageHandler = () => {
    updateScanData({
      url: "",
      metrics: {},
      isAcceptedTerms: false,
      errorMsg: ""
    })
    sessionStorage.removeItem("reportSessionId");
    onInit();
  };

  const metricsData = [
    {
      name: "ביצועים",
      score: scanData.metrics.performance,
    },
    {
      name: "SEO",
      score: scanData.metrics.seo,
    },
    {
      name: "איכות הקוד",
      score: scanData.metrics.bestPractices,
    },
    {
      name: "נגישות",
      score: scanData.metrics.accessibility,
    },
    {
      name: "אבטחה(בקרוב)",
      score: 0,
    },
    {
      name: "בדיקות תוכן(בקרוב)",
      score: 0,
    },
  ];
  return (
    <section className="w-full flex flex-col justify-center items-center gap-10 text-white mt-20">
      <div className="flex items-center justify-center flex-wrap gap-5">
        {metricsData.map((item, index) => (
          <MetricItem
            key={`metric-${index}`}
            name={item.name}
            score={item.score}
          />
        ))}
      </div>
      <div className="w-11/12 flex flex-col items-center justify-center gap-5">
        <div className="flex flex-col justify-center items-center gap-5">
          <p className="text-center">יש לנו ניתוח מעמיק של האתר שלך!</p>
          <p className="text-center">
            רוצה לקבל דו״ח מפורט עם המלצות אישיות לשיפור האתר שלך?
          </p>

          <button
            className="w-48 h-12 flex justify-center items-center rounded-full bg-[#A9661C] relative text-xl"
            onClick={toPersonalDetails}
          >
            קבל את הדו״ח המלא
          </button>
          <button
            className="w-48 h-12 flex justify-center items-center rounded-full bg-[#A9661C] relative text-xl"
            onClick={initPageHandler}
          >
            בדיקה חדשה
          </button>
        </div>

        <div className="w-11/12 text-right">
          <p>כולל:</p>
          <ul className="list-disc flex flex-row list-inside text-sm gap-2">
            <li>ניתוח מעמיק</li>
            <li>המלצות לשיפור</li>
            <li>תובנות מקצועיות</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
