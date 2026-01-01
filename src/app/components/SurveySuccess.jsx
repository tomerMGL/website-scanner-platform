"use client";
import { useState, useEffect } from "react";
import { useScan } from "./WebScanContext";

export default function SurveySuccess({ onInit }) {
 const [timeLeft, setTimeLeft] = useState(10);
  const { resetScanData } = useScan();

 useEffect(() => {
   const timer = setInterval(() => {
     setTimeLeft((prev) => prev - 1);
   }, 1000);

   if (timeLeft === 0) {
    resetScanData();
     onInit();
   }

   return () => clearInterval(timer);
 }, [timeLeft]);

 return (
   <section className="flex flex-col justify-center items-center text-white gap-8 mt-10">
     <h2 className="text-2xl font-bold">תודה על המשוב! 🙏</h2>

     <div className="text-center">
       <p className="mb-2">המשוב שלך חשוב לנו מאוד</p>
       <p>נשתמש בו כדי להמשיך ולשפר את הכלי</p>
       <p className="text-sm text-gray-400 mt-4">מעבר לעמוד הראשי בעוד {timeLeft} שניות</p>
     </div>

     <div className="w-4/6 md:w-2/6">
       <button
         onClick={onInit}
         className="w-full h-12 flex justify-center items-center rounded-full bg-[#A9661C] hover:bg-[#d08918] transition-colors"
       >
         <span>לבדיקת אתר נוסף</span>
         <span className="mr-2">🔄</span>
       </button>
     </div>
   </section>
 );
}