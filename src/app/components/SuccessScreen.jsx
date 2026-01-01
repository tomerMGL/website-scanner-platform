import React from "react";
import { useScan } from "./WebScanContext";

const SuccessScreen = ({ onNext, onInit}) => {
  const { resetScanData } = useScan();
  
  const onInitHandler = () => {
    resetScanData();
    onInit();
  }


  return (
    <section className="flex flex-col justify-center items-center text-white gap-8 mt-10">
      <h2 className="text-2xl font-bold">הדו״ח בדרך אליך ! 🚀</h2>

      <div className="text-center">
        <p className="mb-2">שלחנו את הדו״ח המפורט למייל שלך</p>
        <p>תוך מספר דקות תוכל להתחיל לשפר את ביצועי האתר</p>
      </div>

      <p className="text-xs text-gray-400">
        טיפ: אם לא מצאת את המייל בתיבה הראשית, כדאי לחפש בספאם 😉
      </p>

      <div className="flex flex-col w-4/6 md:w-2/6 gap-4">
        <button
          onClick={onInitHandler}
          className="w-full h-12 flex justify-center items-center rounded-full bg-[#A9661C] hover:bg-[#d08918] transition-colors"
        >
          <span>לבדיקת אתר נוסף</span>
          <span className="mr-2">🔄</span>
        </button>

        <button
          onClick={onNext}
          className="w-full h-12 flex justify-center items-center rounded-full bg-transparent border-2 border-white hover:bg-white hover:text-black transition-colors"
        >
          <span>נשמח לשמוע את דעתך</span>
          <span className="mr-2">💭</span>
        </button>
      </div>
    </section>
  );
};

export default SuccessScreen;
