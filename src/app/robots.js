export default function robots() {
    return {
      rules: {
        userAgent: '*',
        allow: '/',
      },
      sitemap: `https://scan.axistudio.co.il/sitemap.xml`,
    }
  }