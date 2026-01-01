"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const hasAcceptedCookies = localStorage.getItem("cookiesAccepted");
    if (!hasAcceptedCookies) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-[#0C0F19]/90 backdrop-blur-md shadow-lg border-t border-gray-700"
        >
          <div className="container mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row items-center gap-4 text-white">
              <div className="hidden md:flex justify-center items-center">
                <div className="text-3xl">
                  🍪
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-right">
                <h3 className="text-xl mb-2 text-blue-brand">אנחנו משתמשים בעוגיות 🍪</h3>
                <p className="text-sm mb-2">
                  האתר שומר מידע בסיסי כדי לספק לך את החוויה הטובה ביותר. המידע מאובטח ומשמש רק לצורך הפקת הדוח ושיפור השירות.
                </p>
                <p className="text-xs text-gray-400">
                  לחיצה על ״מסכים״ מהווה הסכמה למדיניות הפרטיות שלנו
                </p>
              </div>
              
              <div className="flex flex-col w-full md:w-auto gap-2">
                <button
                  onClick={acceptCookies}
                  className="h-10 px-6 flex justify-center items-center rounded-full bg-[#A9661C] hover:bg-[#d08918] transition-colors text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                >
                  מסכים
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}