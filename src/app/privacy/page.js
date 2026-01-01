
import PrivacyPolicy from "./PrivacyPolicy";

export const metadata = {
  title: "מדיניות פרטיות - סורק האתרים מבית AXIS Studio",
  description: "מידע אודות איסוף, שימוש ואבטחת מידע אישי בכלי סריקת האתרים של AXIS Studio ואיך אנו מגנים על הפרטיות שלך",
  keywords: [
    "מדיניות פרטיות",
    "הגנת פרטיות",
    "מידע אישי",
    "אבטחת מידע",
    "סורק אתרים",
    "AXIS Studio",
    "שימוש במידע"
  ],
  openGraph: {
    title: "מדיניות פרטיות - סורק האתרים מבית AXIS Studio",
    description: "כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך בכלי הסריקה שלנו",
    type: "website",
    locale: "he_IL",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy`,
  },
  twitter: {
    card: "summary",
    title: "מדיניות פרטיות - סורק האתרים מבית AXIS Studio",
    description: "כיצד אנו אוספים, משתמשים ומגנים על המידע האישי שלך",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/privacy`,
  }
};

export default function PrivacyPage() {
  return <PrivacyPolicy />;
}