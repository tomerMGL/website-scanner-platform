"use client";
import Image from "next/image";
import logo from "@/app/assets/Logo.webp";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-20 py-8 text-white bg-background/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="text-center md:text-right">
            <Image
              src={logo}
              width={80}
              height={80}
              alt="לוגו של חברת AXIS Studio בחלק התחתון של הדף"
              className="mx-auto md:mr-0"
            />
            <p className="mt-4 text-sm text-gray-300">
              מובילים בפתרונות דיגיטליים מתקדמים לעסקים
            </p>

            <div className="w-full md:w-1/2 mt-10 flex flex-col justify-between items-center text-sm gap-1">
              <Link href={"/accessibility"}>הצהרת נגישות</Link>
              <Link href={"/privacy"}>מדיניות פרטיות</Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="text-center">
            <h3 className="text-lg font-medium mb-4">הכלי בודק</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>מהירות טעינה</li>
              <li>ביצועי SEO</li>
              <li>נגישות</li>
              <li>איכות קוד</li>
              <li>חווית משתמש</li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-medium mb-4">צור קשר</h3>
            <div className="space-y-2 text-sm text-gray-300">
              <p>מייל: office@axistudio.co.il</p>
              <p>טלפון: 054-8238818</p>
              <div className="mt-4">
                <button
                  className="bg-[#A9661C] px-6 py-2 rounded-full text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.5)]"
                  onClick={() =>
                    (window.location.href = "https://axistudio.co.il")
                  }
                >
                  לאתר החברה
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-4 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>כל הזכויות שמורות © AXIS Studio {currentYear}</p>
        </div>
      </div>
    </footer>
  );
}
