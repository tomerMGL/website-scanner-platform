"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  const emojis = ["🔍", "🤔", "😕", "🚀", "🛸"];
  const [currentEmojiIndex, setCurrentEmojiIndex] = useState(0);

  useEffect(() => {
    const emojiTimer = setInterval(() => {
      setCurrentEmojiIndex((prev) => (prev + 1) % emojis.length);
    }, 2000);
    return () => clearInterval(emojiTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-white px-4">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-lg w-full mx-auto text-center"
      >
        <motion.div 
          variants={itemVariants}
          className="text-8xl mb-6"
          animate={{ 
            rotate: [0, -10, 10, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut" 
          }}
        >
          {emojis[currentEmojiIndex]}
        </motion.div>

        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold mb-4 text-blue-brand"
        >
          אופס! העמוד התעופף לו...
        </motion.h1>

        <motion.p 
          variants={itemVariants}
          className="text-xl mb-6"
        >
          כנראה שהוא הלך לבדוק אתרים אחרים
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="bg-[#1f1f1f] p-6 rounded-lg mb-8"
        >
          <p className="text-lg">
            יכול להיות ש:
          </p>
          <ul className="text-gray-300 mt-3 text-right mr-6 list-disc list-inside">
            <li className="mb-1">הכתובת שהזנת אינה קיימת</li>
            <li className="mb-1">הדף הוסר או שונה</li>
            <li>הסורק שלנו מחפש אותו גם ברגעים אלו!</li>
          </ul>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col gap-4 items-center"
        >
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-48 h-12 flex justify-center items-center rounded-full bg-[#A9661C] hover:bg-[#d08918] transition-colors relative text-xl drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
            >
              חזרה לעמוד הראשי
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}