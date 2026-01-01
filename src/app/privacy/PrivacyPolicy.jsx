'use client'
import { useState } from "react";

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("overview");

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <section className="flex flex-col justify-center items-center text-white mt-5 w-full max-w-4xl mx-auto px-4">
      <div className="flex flex-col items-center justify-center w-full mb-8">
        <h1 className="text-3xl font-bold mb-2">מדיניות פרטיות</h1>
        <p className="text-blue-brand text-xl text-center">
          מידע על איסוף ושימוש במידע בכלי הסריקה
        </p>
      </div>

      {/* תפריט ניווט */}
      <div className="flex flex-wrap justify-center gap-2 mb-8 w-full">
        <button
          onClick={() => handleSectionChange("overview")}
          className={`px-4 py-2 rounded-full ${
            activeSection === "overview"
              ? "bg-[#A9661C] text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          כללי
        </button>
        <button
          onClick={() => handleSectionChange("collection")}
          className={`px-4 py-2 rounded-full ${
            activeSection === "collection"
              ? "bg-[#A9661C] text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          איסוף מידע
        </button>
        <button
          onClick={() => handleSectionChange("usage")}
          className={`px-4 py-2 rounded-full ${
            activeSection === "usage"
              ? "bg-[#A9661C] text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          שימוש במידע
        </button>
        <button
          onClick={() => handleSectionChange("sharing")}
          className={`px-4 py-2 rounded-full ${
            activeSection === "sharing"
              ? "bg-[#A9661C] text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          שיתוף מידע
        </button>
        <button
          onClick={() => handleSectionChange("security")}
          className={`px-4 py-2 rounded-full ${
            activeSection === "security"
              ? "bg-[#A9661C] text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          אבטחת מידע
        </button>
        <button
          onClick={() => handleSectionChange("rights")}
          className={`px-4 py-2 rounded-full ${
            activeSection === "rights"
              ? "bg-[#A9661C] text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          יצירת קשר
        </button>
      </div>

      {/* תוכן מדיניות הפרטיות */}
      <div className="w-full bg-[#1f1f1f] rounded-lg p-6 mb-10">
        {activeSection === "overview" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">מדיניות פרטיות</h2>
            <p>
              ברוכים הבאים לכלי סריקת האתרים של AXIS Studio. אנו מחויבים לשמירה
              על פרטיותך ומדיניות זו מפרטת את המידע שאנו אוספים, כיצד אנו
              משתמשים בו ומה זכויותיך בנוגע למידע זה.
            </p>
            <p>
              מדיניות פרטיות זו חלה על כל המידע הנאסף באמצעות הכלי לסריקת אתרים
              שלנו, כולל מידע שהוזן על ידך במהלך השימוש בכלי והמידע הנאסף
              אוטומטית.
            </p>
            <p>
              השימוש בכלי הסריקה מהווה הסכמה למדיניות פרטיות זו. אם אינך מסכים
              למדיניות זו, אנא הימנע משימוש בכלי.
            </p>
            <p>
              אנו רשאים לעדכן את מדיניות הפרטיות מעת לעת. בעת שינויים מהותיים,
              נודיע לך באמצעות הודעה בולטת בכלי הסריקה או באמצעות הודעת דוא"ל.
            </p>
          </div>
        )}

        {activeSection === "collection" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">איסוף מידע</h2>
            <p>אנו אוספים את המידע הבא במהלך השימוש בכלי הסריקה:</p>

            <h3 className="text-xl font-medium mt-6 mb-2">מידע שאתה מספק</h3>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>כתובת URL של האתר שברצונך לסרוק</li>
              <li>שם מלא (אופציונלי)</li>
              <li>כתובת דואר אלקטרוני (לשליחת הדוח)</li>
              <li>מספר טלפון (אופציונלי)</li>
              <li>משוב ותגובות שאתה מספק בסקר</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-2">
              מידע הנאסף אוטומטית
            </h3>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>מידע על ביצועי האתר שנסרק</li>
              <li>מדדי SEO של האתר הנסרק</li>
              <li>נתוני נגישות של האתר הנסרק</li>
              <li>איכות הקוד של האתר הנסרק</li>
              <li>כתובת IP של המשתמש</li>
              <li>נתוני דפדפן ומכשיר</li>
              <li>תאריך ושעת השימוש בכלי</li>
            </ul>
          </div>
        )}

        {activeSection === "usage" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">שימוש במידע</h2>
            <p>אנו משתמשים במידע שנאסף למטרות הבאות:</p>

            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>ביצוע סריקה של האתר וניתוח הביצועים שלו</li>
              <li>הכנת דוח מפורט עם תוצאות הסריקה והמלצות לשיפור</li>
              <li>שליחת הדוח לכתובת הדואר האלקטרוני שסיפקת</li>
              <li>
                יצירת קשר לגבי שירותים נוספים שעשויים לעניין אותך (רק אם נתת
                הסכמה מפורשת)
              </li>
              <li>שיפור ופיתוח הכלי על סמך המשוב והשימוש</li>
              <li>ניתוח סטטיסטי של השימוש בכלי (באופן אנונימי)</li>
              <li>מניעת שימוש לרעה בכלי והגבלת מספר הסריקות ליום</li>
            </ul>

            <h3 className="text-xl font-medium mt-6 mb-2">תקופת שמירת המידע</h3>
            <p>
              אנו שומרים את המידע האישי שלך למשך הזמן הנדרש למטרות שלשמן הוא
              נאסף, או כנדרש על פי חוק. תוצאות הסריקה נשמרות למשך 30 יום מיום
              הסריקה.
            </p>
          </div>
        )}

        {activeSection === "sharing" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">שיתוף מידע</h2>
            <p>
              אנו משתפים את המידע האישי שלך עם צדדים שלישיים רק במקרים הבאים:
            </p>

            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>
                עם ספקי שירות שעובדים עם AXIS Studio (כגון שירותי שליחת דואר
                אלקטרוני)
              </li>
              <li>כאשר נדרש לעשות זאת על פי חוק או בהליך משפטי</li>
              <li>
                כדי להגן על הזכויות, הקניין או הבטיחות שלנו, של לקוחותינו או של
                אחרים
              </li>
            </ul>

            <p className="mt-4">
              איננו מוכרים או משכירים את המידע האישי שלך לצדדים שלישיים למטרות
              שיווק.
            </p>
          </div>
        )}

        {activeSection === "security" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">אבטחת מידע</h2>
            <p>
              אנו נוקטים באמצעי אבטחה סבירים כדי להגן על המידע האישי שלך מפני
              אובדן, גישה לא מורשית, שימוש לרעה, שינוי או חשיפה.
            </p>

            <p className="mt-4">
              עם זאת, שום שיטת העברה באינטרנט או אחסון אלקטרוני אינה מאובטחת
              ב-100%. לכן, בעוד שאנו שואפים להגן על המידע האישי שלך, איננו
              יכולים להבטיח את האבטחה המוחלטת שלו.
            </p>

            <h3 className="text-xl font-medium mt-6 mb-2">אמצעי אבטחה</h3>
            <ul className="list-disc list-inside space-y-2 mr-4">
              <li>כל התקשורת עם השרת מוצפנת באמצעות פרוטוקול HTTPS</li>
              <li>
                הגבלת גישה למידע רק לעובדים מורשים הזקוקים למידע לצורך עבודתם
              </li>
              <li>אחסון מידע רגיש בצורה מוצפנת</li>
              <li>גיבוי סדיר של הנתונים</li>
              <li>עדכון שוטף של מערכות ותוכנות אבטחה</li>
            </ul>
          </div>
        )}

        {activeSection === "rights" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">צור קשר</h2>
            <p>לכל שאלה או בקשה בנוגע למדיניות פרטיות זו, אנא צור קשר:</p>
            <p className="mt-2">
              אקסיס סטודיו
              <br />
              דוא"ל: office@axistudio.co.il
              <br />
              טלפון: 054-8238818
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
