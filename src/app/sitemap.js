export default function sitemap() {
    return [
      {
        url: `https://scan.axistudio.co.il`,
        lastModified: new Date(),
        changeFrequency: 'daily',
        priority: 1,
      },
      {
        url: `https://scan.axistudio.co.il/privacy`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
      {
        url: `https://scan.axistudio.co.il/accessibility`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      },
    ]
  }