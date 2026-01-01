import AccessibilityDeclaration from "./AccessibilityDeclaration";



export const metadata = {
  title: "הצהרת נגישות - סורק האתרים מבית AXIS Studio",
  description: "מידע אודות אמצעי הנגישות והתאמות שנעשו באתר סורק האתרים של AXIS Studio כדי להבטיח גישה שווה לכל המשתמשים",
  keywords: [
    "נגישות אתר",
    "הצהרת נגישות",
    "תקן נגישות",
    "התאמות נגישות",
    "אתר מונגש",
    "סורק אתרים",
    "AXIS Studio"
  ],
  openGraph: {
    title: "הצהרת נגישות - סורק האתרים מבית AXIS Studio",
    description: "פירוט אמצעי הנגישות ותקן הנגישות שבו עומד האתר שלנו לטובת גישה שווה לכל המשתמשים",
    type: "website",
    locale: "he_IL",
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/accessibility`,
  },
  twitter: {
    card: "summary",
    title: "הצהרת נגישות - סורק האתרים מבית AXIS Studio",
    description: "פירוט אמצעי הנגישות ותקן הנגישות שבו עומד האתר שלנו",
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/accessibility`,
  }
};

export default function AccessibilityPage() {
  return <AccessibilityDeclaration />
}