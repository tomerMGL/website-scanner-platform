export default function StructuredData() {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'בדיקת ביצועי אתר',
      description: 'כלי חינמי לבדיקת ביצועי אתר, מהירות טעינה, SEO ונגישות',
      applicationCategory: 'WebsiteAnalysisTool',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'ILS',
      },
      featureList: [
        'בדיקת מהירות טעינה',
        'ניתוח SEO',
        'בדיקת נגישות',
        'בדיקת איכות קוד',
        'דוח מפורט עם המלצות'
      ]
    };
  
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    );
  }