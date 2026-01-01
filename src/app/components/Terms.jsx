import { motion } from "framer-motion";
import { useScan } from "./WebScanContext";
import { TERMS } from "../constants/terms";

export default function Terms({ onNext }) {
  const { scanData } = useScan();

  return (
    <motion.section
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
      className="w-full flex flex-col justify-center items-center gap-5 mt-20 bg-background text-white"
    >
      <h2>רגע לפני שמתחילים לסרוק את</h2>
      <div className="flex flex-row-reverse items-center justify-center gap-5">
        <img
          className="w-6"
          src={`https://www.google.com/s2/favicons?domain=${scanData.url}`}
          alt={`favicon-${scanData.url}`}
          loading="lazy"
        />
        <p>{scanData.url}</p>
      </div>
      <div className="w-4/5 h-60 flex flex-col gap-5 border-2 overflow-scroll">
        <h3>תנאי שימוש</h3>
          {TERMS.map((term, index) => (
            <div key={`term-${index}`}>
              <h4>{term.id}.{term.header}</h4>
              {term.subItems.map((termItem, index) => (<p key={`term-item-${index}`}>{termItem}</p>))}
            </div>
          ))}
      </div>
      <p>בלחיצה על כפתור המשך הינך מסכים לתנאי השימוש</p>
      <div>
        <button
          className="w-36 h-12 flex justify-center items-center rounded-full bg-[#A9661C] relative text-xl"
          onClick={onNext}
        >
          הסכם והמשך
        </button>
      </div>
    </motion.section>
  );
}
