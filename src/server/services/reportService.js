import puppeteer from "puppeteer";
import { getSession, deleteSession } from "../utils/sessions";
import { sendEmail } from "./emailService";
import path from "path";
import fs from "fs/promises";
import { saveLead } from "./sheetsService";
import { reportHtml } from "../utils/reportHtml";

export const generateReport = async (data) => {
  const { name, email, phone } = data;

  const headerImagePath = path.join(
    process.cwd(),
    "src",
    "server",
    "assets",
    "header.png"
  );
  const headerImageBuffer = await fs.readFile(headerImagePath);
  const headerImageBase64 = headerImageBuffer.toString("base64");

  const reportData = getSession(data.sessionId);
  if (!reportData) {
    throw new Error("Session expired or not found");
  }

  if (!reportData.scores) {
    throw new Error("Invalid report data structure");
  }

  deleteSession(data.sessionId);

  saveLead(reportData.siteUrl, name, email, phone, {
    ...reportData.scores,
  }).catch((err) => console.error(`שגיאה בשמירת המידע לגיליון: ${err.message || 'שגיאה לא ידועה'}`));

  try {
    const browser = await puppeteer.launch({
      headless: "new",
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-accelerated-2d-canvas",
        "--disable-gpu",
        "--disable-extensions",
        "--disable-background-networking",
        "--disable-default-apps",
        "--disable-sync",
        "--disable-translate",
        "--hide-scrollbars",
        "--metrics-recording-only",
        "--mute-audio",
        "--no-first-run",
        "--safebrowsing-disable-auto-update",
        "--js-flags=--max-old-space-size=512",
      ],
      executablePath: "/usr/bin/chromium-browser",
    });

    const pages = await browser.pages();
    await Promise.all(
      pages.slice(1).map(page => page.close())
    );
    
    const page = await browser.newPage();

    await page.setRequestInterception(true);

    page.on('request', (req) => {
      const resourceType = req.resourceType();
      if (
        resourceType === 'image' || 
        resourceType === 'stylesheet' || 
        resourceType === 'font' ||
        resourceType === 'media'
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });

    await page.setJavaScriptEnabled(false);
    await page.setCacheEnabled(false);



    const genHtmlReport = reportHtml(reportData, name, headerImageBase64);

    await page.setContent(genHtmlReport);

    const pdf = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: false,
      margin: {
        top: "0",
        left: "0",
        bottom: "0",
        right: "0",
      },
      preferCSSPageSize: false,
    });

    await page.close();
    await browser.close();


    const resEmail = await sendEmail(pdf, reportData.siteUrl, name, email);

    return resEmail;

  } catch (error) {
    console.error("Error generating PDF:", error);
    throw error;
  }
};

/* Core Web Vitals - מדדי ליבה:

First Contentful Paint (FCP) - זמן הופעת תוכן ראשון: כמה זמן לוקח עד שהמשתמש רואה משהו מוחשי ראשון בדף
Largest Contentful Paint (LCP) - זמן הופעת התוכן הגדול: כמה זמן לוקח עד שהתמונה או הטקסט הגדולים ביותר בדף מוצגים
Total Blocking Time (TBT) - זמן חסימה כולל: כמה זמן הדף "תקוע" ולא מגיב ללחיצות המשתמש
Cumulative Layout Shift (CLS) - קפיצות תוכן מצטברות: כמה פעמים התוכן זז באופן לא צפוי בזמן טעינת הדף

מדדים נוספים חשובים:

Speed Index - מדד מהירות: כמה מהר התוכן הנראה לעין מופיע בדף
Time to Interactive (TTI) - זמן לאינטראקטיביות: מתי הדף מוכן לחלוטין לשימוש המשתמש
Time to First Byte (TTFB) - זמן תגובת שרת: כמה זמן לוקח לשרת להגיב לבקשה הראשונית 
*/
