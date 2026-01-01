'use client'
import { useState } from "react";

export default function AccessibilityDeclaration() {
    const [activeSection, setActiveSection] = useState("general");
  
    const handleSectionChange = (section) => {
      setActiveSection(section);
    };
  
    return (
      <section className="flex flex-col justify-center items-center text-white mt-5 w-full max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center w-full mb-8">
          <h1 className="text-3xl font-bold mb-2">הצהרת נגישות</h1>
          <p className="text-blue-brand text-xl text-center">
            AXIS מחויבת לספק אתר נגיש לכלל המשתמשים באינטרנט
          </p>
        </div>
  
        {/* תפריט ניווט */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 w-full">
          <button
            onClick={() => handleSectionChange("general")}
            className={`px-4 py-2 rounded-full ${
              activeSection === "general"
                ? "bg-[#A9661C] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            כללי
          </button>
          <button
            onClick={() => handleSectionChange("features")}
            className={`px-4 py-2 rounded-full ${
              activeSection === "features"
                ? "bg-[#A9661C] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            אמצעי נגישות
          </button>
          <button
            onClick={() => handleSectionChange("view")}
            className={`px-4 py-2 rounded-full ${
              activeSection === "view"
                ? "bg-[#A9661C] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            שינוי תצוגה
          </button>
          <button
            onClick={() => handleSectionChange("compatibility")}
            className={`px-4 py-2 rounded-full ${
              activeSection === "compatibility"
                ? "bg-[#A9661C] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            התאמה למוגבלויות
          </button>
          <button
            onClick={() => handleSectionChange("contact")}
            className={`px-4 py-2 rounded-full ${
              activeSection === "contact"
                ? "bg-[#A9661C] text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            יצירת קשר
          </button>
        </div>
  
        {/* תוכן הצהרת הנגישות */}
        <div className="w-full bg-[#1f1f1f] rounded-lg p-6 mb-10">
          {activeSection === "general" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">הצהרת נגישות</h2>
              <p className="mb-4">
                אקסיס סטודיו הינה חברה למתן שירותי פיתוח אתרים, עיצוב ומיתוג
                דיגיטלי. בהצהרה זו מטרתנו לייעל את השימוש ולשפר את השירות שלנו בכל
                הנוגע לנגישות ושוויון זכויות לאנשים בעלי מוגבלויות.
              </p>
              <p className="mb-4">
                התאמת הנגישות שלנו בוצעה בהתאם לתקנה 35 בתקנות שוויון זכויות
                לאנשים עם מוגבלות (התאמות נגישות לשירות) התשע"ג 2013 לרמה AA בכפוף
                לשינויים והתאמות שבוצעו במסמך התקן הישראלי.
              </p>
              <p>התאמת הנגישות נבדקה בדפדפנים: כרום, פיירפוקס, ספארי, אדג'.</p>
            </div>
          )}
  
          {activeSection === "features" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">
                אמצעי נגישות הקיימים באתר
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  תמיכה בכל הדפדפנים התקניים המקובלים כמו Chrome, Edge, FireFox,
                  Safari
                </li>
                <li>תכני האתר נכתבו בשפה ברורה ונעשה שימוש בפונטים קריאים</li>
                <li>מבניות האתר בנויה מכותרות, פסקאות ורשימות</li>
                <li>
                  התמצאות באתר היא פשוטה ונוחה וכוללת תפריטים זמינים וברורים
                </li>
                <li>
                  הקישורים באתר ברורים ומסבירים להיכן מועברים לאחר לחיצה עליהם
                </li>
                <li>קישורים בתחילת הדף המאפשרים דילוג לתוכן</li>
                <li>תיאור טקסטואלי לתמונות ואייקונים עבור טכנולוגיות מסייעות</li>
                <li>התאמת האתר לסביבות עבודה ברזולוציות שונות (רספונסיביות)</li>
                <li>כפתורי עצירה והפעלה של גלריות וסרטונים</li>
                <li>הוטמעו חוקי ARIA העוזרים לפרש את תוכן האתר בצורה מדויקת</li>
                <li>הנגשת תפריטים, טפסים, שדות, היררכיית כותרות, ועוד</li>
              </ul>
            </div>
          )}
  
          {activeSection === "view" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">שינוי תצוגה באתר</h2>
              <ul className="list-disc list-inside space-y-3">
                <li>
                  ניתן להגדיל או להקטין את תצוגת האתר באמצעות לחיצה על אחד מכפתורי
                  ה-"CTRL" ביחד עם גלגלת העכבר או ביחד עם הסימן "+" עבור הגדלה או
                  ביחד עם הסימן "-" עבור הקטנת התצוגה. כל לחיצה תקטין או תגדיל את
                  המסך בעשרה אחוזים (10%)
                </li>
                <li>
                  גולשים אשר אין ברשותם עכבר או שאינם יכולים לעשות שימוש בעכבר
                  יכולים להפעיל את התכונות המצויות באתר על ידי לחיצה על המקש
                  "TAB". כל לחיצה תעביר את הסמן אל האפשרות הבאה באתר. לחיצה על מקש
                  ה-"Enter" תפעיל את הקישור עליו נמצא הסמן
                </li>
                <li>
                  האתר אינו כולל הבהובים, ריצודים ותכנים בתנועה. במקומות אשר
                  נמצאים תכנים כאלה, ניתן לעצור אותם בעמידה עליהם ולחיצה על העכבר
                  או מעבר אליהם על ידי מקש ה-"TAB" ולחיצה על מקש ה-"Enter"
                </li>
              </ul>
            </div>
          )}
  
          {activeSection === "compatibility" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">
                התאמת אתר למוגבלי ראייה ושמיעה
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>מגדילי ראות (רזולוציה) בסיסיים</li>
                <li>תוכנות זיהוי קולי</li>
                <li>חבילות זיהוי קולי של מערכות ההפעלה</li>
              </ul>
  
              <h3 className="text-xl font-medium mt-6 mb-2">סייגים לנגישות</h3>
              <p>
                הנהלת האתר עושה ככל שניתן על מנת לוודא כי כלל הדפים המוצגים יהיו
                מונגשים. יחד עם זאת, יתכן וישנם דפים שטרם הונגשו, או שטרם נמצא
                פתרון טכנולוגי מתאים לצורך הנגשתם. בנוסף, ייתכן ובמודעות חיצוניות
                אשר הוכנסו על ידי בעלי עסקים המפרסמים באתר, ההנגשה לא תהיה שלמה או
                מספקת.
              </p>
            </div>
          )}
  
          {activeSection === "contact" && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold mb-4">
                נתקלתם בבעיה? אנחנו כאן כדי לסייע!
              </h2>
              <div className="space-y-2">
                <h3 className="text-xl">פרטי אחראי נגישות באתר:</h3>
                <p>שם: תומר גזיאל</p>
                <p>אימייל:  office@axistudio.co.il</p>
                <p>טלפון: 054-82388187</p>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
  