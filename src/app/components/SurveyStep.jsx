"use client";
import { useState } from "react";
import { useScan } from "./WebScanContext";
import { SYSTEM_MESSAGES } from "../constants/messages";

export default function SurveyStep({ onNext }) {
  const { scanData } = useScan();
  const [statusMessage, setStatusMessage] = useState("");
  const [feedback, setFeedback] = useState({
    clarity: 3,
    useful: null,
    moreTools: null,
    improvements: "",
    subscribeToUpdates: false,
  });
  const { url } = scanData || "";
  const { name, email, phone } = scanData.personalDetails || {};

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFeedback((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (feedback.useful === null || feedback.moreTools === null) {
      setStatusMessage(SYSTEM_MESSAGES.SURVEY.statusMessage.required);
      return;
    }
    try {
      const response = await fetch("/api/survey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url,
          name,
          email,
          phone,
          ...feedback,
        }),
      });

      if (!response.ok) {
        setStatusMessage(SYSTEM_MESSAGES.SURVEY.statusMessage.fail);
      }

      setStatusMessage(SYSTEM_MESSAGES.PERSONAL_DETAILS.statusMessage.success);
      onNext();
    } catch (error) {
    }
  };

  return (
    <section className="flex flex-col justify-center items-center text-white gap-8 mt-10">
      <h2 className="text-2xl font-bold">נשמח לשמוע את דעתך!</h2>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col justify-center items-center gap-6"
      >
        {/* דירוג בהירות */}
        <div className="w-4/6 md:w-2/6">
          <label className="block mb-3">כמה ברורות היו התוצאות?</label>
          <div className="flex justify-between gap-2 text-black">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() =>
                  handleChange({ target: { name: "clarity", value: num } })
                }
                className={`w-12 h-12 rounded-full ${
                  feedback.clarity === num
                    ? "bg-[#A9661C] text-white"
                    : "bg-white hover:bg-gray-100"
                } transition-colors`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        {/* האם היה שימושי */}
        <div className="w-4/6 md:w-2/6">
          <label className="block mb-3">האם הדו״ח סיפק מידע שימושי?</label>
          <div className="flex gap-4 text-black">
            <button
              type="button"
              onClick={() =>
                handleChange({ target: { name: "useful", value: true } })
              }
              className={`flex-1 h-12 rounded-full ${
                feedback.useful === true
                  ? "bg-[#A9661C] text-white"
                  : "bg-white hover:bg-gray-100"
              } transition-colors`}
            >
              כן
            </button>
            <button
              type="button"
              onClick={() =>
                handleChange({ target: { name: "useful", value: false } })
              }
              className={`flex-1 h-12 rounded-full ${
                feedback.useful === false
                  ? "bg-[#A9661C] text-white"
                  : "bg-white hover:bg-gray-100"
              } transition-colors`}
            >
              לא
            </button>
          </div>
        </div>

        {/* עוד כלים */}
        <div className="w-4/6 md:w-2/6">
          <label className="block mb-3">
            האם מצאת ערך בכלי והיית רוצה לראות כלים דומים בעתיד?
          </label>
          <div className="flex gap-4 text-black text-xs">
            <button
              type="button"
              onClick={() =>
                handleChange({ target: { name: "moreTools", value: true } })
              }
              className={`flex-1 h-12 rounded-full ${
                feedback.moreTools === true
                  ? "bg-[#A9661C] text-white"
                  : "bg-white hover:bg-gray-100"
              } transition-colors`}
            >
              כן, זה היה שימושי
            </button>
            <button
              type="button"
              onClick={() =>
                handleChange({ target: { name: "moreTools", value: false } })
              }
              className={`flex-1 h-12 rounded-full ${
                feedback.moreTools === false
                  ? "bg-[#A9661C] text-white"
                  : "bg-white hover:bg-gray-100"
              } transition-colors`}
            >
              לא, פחות מתאים לי
            </button>
          </div>
        </div>

        {/* מה לשפר */}
        <div className="w-4/6 md:w-2/6">
          <label className="block mb-3">מה היית משפר?</label>
          <input
            type="text"
            name="improvements"
            value={feedback.improvements}
            onChange={handleChange}
            className="w-full h-12 rounded-full text-black indent-3"
            placeholder="נשמח לשמוע..."
          />
        </div>

        {/* הרשמה לעדכונים */}
        <div className="w-4/6 md:w-2/6 flex items-start gap-3 bg-[#1f1f1f] p-4 rounded-lg">
          <input
            type="checkbox"
            name="subscribeToUpdates"
            id="subscribeToUpdates"
            checked={feedback.subscribeToUpdates}
            onChange={handleChange}
            className="mt-1"
          />
          <label htmlFor="subscribeToUpdates" className="text-sm">
            אני מעוניין/ת להתעדכן בכלים חינמיים נוספים מבית AXIS לשיפור האתר שלי
            🚀
          </label>
        </div>
        {statusMessage && <p>{statusMessage}</p>}

        <button
          type="submit"
          className="w-4/6 md:w-2/6 h-12 flex justify-center items-center rounded-full bg-[#A9661C] hover:bg-[#d08918] transition-colors relative text-xl mt-4"
        >
          <span>שליחת המשוב</span>
          <span className="mr-2">🙏</span>
        </button>
      </form>
    </section>
  );
}
