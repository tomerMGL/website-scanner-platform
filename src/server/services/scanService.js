import { createSession } from "../utils/sessions";

export const scanWebsite = async (urlToScan) => {
  try {
    const apiUrl = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(
      urlToScan
    )}&key=${
      process.env.GOOGLE_PAGESPEED_KEY
    }&strategy=desktop&strategy=mobile&category=PERFORMANCE&category=ACCESSIBILITY&category=BEST_PRACTICES&category=SEO`;

    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.lighthouseResult?.categories?.performance?.score) {
      throw new Error(
        "Invalid response : Missing performance data"
      );
    }
    const finalDataResult = {
      siteUrl: urlToScan,
      scores: {
        performance: Math.floor(
          data.lighthouseResult?.categories?.performance?.score * 100
        ),
        accessibility: Math.floor(
          data.lighthouseResult?.categories?.accessibility?.score * 100
        ),
        bestPractices: Math.floor(
          data.lighthouseResult?.categories["best-practices"]?.score * 100
        ),
        seo: Math.floor(data.lighthouseResult?.categories?.seo?.score * 100),
      },
      coreWebVitals: {
        firstContentfulPaint: {
          score:
            data.lighthouseResult?.audits["first-contentful-paint"].score * 100,
          value:
            data.lighthouseResult?.audits["first-contentful-paint"]
              .displayValue,
        },
        largestContentfulPaint: {
          score:
            data.lighthouseResult?.audits["largest-contentful-paint"].score *
            100,
          value:
            data.lighthouseResult?.audits["largest-contentful-paint"]
              .displayValue,
        },
        totalBlockingTime: {
          score:
            data.lighthouseResult?.audits["total-blocking-time"].score * 100,
          value:
            data.lighthouseResult?.audits["total-blocking-time"].displayValue,
        },
        cumulativeLayoutShift: {
          score:
            data.lighthouseResult?.audits["cumulative-layout-shift"].score *
            100,
          value:
            data.lighthouseResult?.audits["cumulative-layout-shift"]
              .displayValue,
        },
        speedIndex: {
          score: data.lighthouseResult?.audits["speed-index"].score * 100,
          value: data.lighthouseResult?.audits["speed-index"].displayValue,
        },
        interactive: {
          score: data.lighthouseResult?.audits["interactive"].score * 100,
          value: data.lighthouseResult?.audits["interactive"].displayValue,
        },
      },

      opportunity: {
        renderBlockingResources:
        
          data.lighthouseResult?.audits["render-blocking-resources"]
            ?.displayValue || "אין משאבים חוסמים",
        unusedCssRules:
          data.lighthouseResult?.audits["unused-css-rules"]?.displayValue ||
          "אין CSS מיותר",
        unusedJavascript:
          data.lighthouseResult?.audits["unused-javascript"]?.displayValue ||
          "אין JavaScript מיותר",
        unminifiedCss:
          data.lighthouseResult?.audits["unminified-css"]?.displayValue ||
          "אין CSS לא מכווץ",
        unminifiedJavascript:
          data.lighthouseResult?.audits["unminified-javascript"]
            ?.displayValue || "אין JavaScript לא מכווץ",
        modernImageFormats:
          data.lighthouseResult?.audits["modern-image-formats"]?.displayValue ||
          "אין בעיות בפורמט התמונות",
        serverResponseTime:
          data.lighthouseResult?.audits["server-response-time"]?.displayValue ||
          "זמן תגובת שרת תקין",
      },
    };

    const sessionId = createSession(finalDataResult);

    return { sessionId, scores: finalDataResult.scores };
  } catch (error) {
    throw error;
  }
};
