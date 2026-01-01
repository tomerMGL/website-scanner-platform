import Image from "next/image";
import dynamic from "next/dynamic";

import arrow from "@/app/assets/arrow.webp";
import robotLottie from "@/app/assets/robot.json";

import { useScan } from "./WebScanContext";
import { validateUrl } from "../api/utils/validators";

const Lottie = dynamic(() => import("lottie-react"), {
  ssr: false,
  loading: () => <div>טוען...</div>,
});

export default function InitialStep({ onNext }) {
  const { scanData, updateScanData } = useScan();

  const updateUrlHandler = (e) => {
    if (e.target.value.length > 6) {
      const urlVal = validateUrl(e.target.value);

      if (urlVal.isValid) updateScanData({ url: urlVal.normalizedUrl });
    }
  };

  const nextStepHandler = () => {
    if (scanData.url === "") {
      alert("כתובת לא תקינה");
      return;
    }
    onNext();
  };

  return (
    <section className="w-full flex flex-col justify-center text-white">
      <div className="flex flex-col justify-center items-center mt-16">
        <h2 className="text-3xl">בדקו את האתר שלכם</h2>
        <p className="text-blue-brand text-xl">
          סריקה קצרה וחינמית שלוקחת רק 30 שניות
        </p>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-3 mt-12">
        <input
          type="url"
          className="w-4/6 md:w-2/6 h-12 rounded-full text-black indent-3"
          dir="ltr"
          placeholder="https://האתר שלך.co.il"
          onChange={updateUrlHandler}
        />
        <button
          className="w-36 h-12 flex justify-center items-center rounded-full bg-[#A9661C] relative text-xl"
          onClick={nextStepHandler}
          aria-label="סריקה" 
        >
          <Image
            src={arrow}
            className="absolute left-0 drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
            width={40}
            loading="eager"
            alt="אייקון של חץ שמאלה להמשך תהליך הסריקה"
            quality={80}
          />
          <span className="relative left-3 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]">סריקה</span>
        </button>
      </div>

      <div className="w-full flex flex-col justify-center items-center gap-10 mt-10">
        <div className="text-2xl text-center">
          <p>אנחנו רק סורקים מבחוץ,</p>
          <p>לא משנים דבר באתר</p>
        </div>
        <Lottie
          animationData={robotLottie}
          className="w-5/12 md:w-3/12 lg:w-1/12 "
          loop={true}
        />
      </div>
    </section>
  );
}
