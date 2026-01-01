import { translatePotentialSavings } from "./regex";

function getScoreClass(score) {
  if (score >= 90) return "good";
  if (score >= 70) return "warning";
  return "poor";
}

export const reportHtml = (reportData, name, headerImageBase64) => `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head>
  <meta charset="UTF-8">
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Heebo:wght@400;500;700&display=swap");
    
    /* Reset */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body, html {
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      font-family: "Heebo", sans-serif;
      background: #f2f4f7;
    }
    
    /* מכיל את כל התוכן */
    .container {
      width: 100%;
      max-width: 100%;
      background: #f2f4f7;
    }
    
    /* עמוד */
    .page {
      width: 100%;
      min-height: 100vh;
      position: relative;
      page-break-after: always;
      background: #f2f4f7;
      padding-bottom: 60px; /* מרווח בתחתית העמוד עבור הפוטר */
    }
    
    /* כותרת עליונה */
    .header {
      width: 100%;
      height: 180px;
      background-image: url('data:image/png;base64,${headerImageBase64}');
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      color: white;
      position: relative;
      padding: 20px;
    }
    
    .header-content-right {
      position: absolute;
      top: 20px;
      right: 20px;
      z-index: 2;
    }
    
    .title {
      font-size: 28px;
      font-weight: bold;
      margin: 0;
      padding: 0;
    }
    
    .site-url {
      margin-top: 10px;
      font-size: 14px;
      color: #e0e0e0;
    }
    
    .header-name {
      margin-top: 20px;
      font-size: 16px;
    }
    
    .report-date {
      position: absolute;
      font-size: 12px;
      top: 20px;
      left: 20px;
      color: #e0e0e0;
    }
    
    .header-cta {
      position: absolute;
      bottom: 40px;
      left: 20px;
      width: 200px;
      text-align: right;
      font-size: 14px;
      margin: 0;
    }
    
    .header-phone {
      position: absolute;
      bottom: 15px;
      left: 20px;
      text-align: right;
      font-size: 14px;
      margin: 0;
    }
    
    /* תיבת ציון */
    .score-section {
      width: 80%;
      margin: 20px auto;
      background: white;
      border-radius: 8px;
      padding: 20px 20px 50px 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      overflow: visible;
    }
    
    .overall-score {
      font-size: 48px;
      font-weight: bold;
      text-align: center;
      margin: 10px 0;
      position: relative;
      display: inline-block;
    }
    
    /* קטגוריה */
    .category {
      width: 80%;
      margin: 20px auto;
      background: white;
      border-radius: 8px;
      padding: 20px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .category-title {
      font-size: 18px;
      font-weight: bold;
      color: #1a237e;
      margin: 0 0 15px 0;
      padding-bottom: 5px;
      border-bottom: 2px solid #e0e0e0;
    }
    
    .metric {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid #f5f5f5;
    }
    
    .metric:last-child {
      border-bottom: none;
    }
    
    /* המלצות */
    .recommendations {
      width: 80%;
      margin: 20px auto;
      background: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .recommendations-title {
      font-size: 18px;
      font-weight: bold;
      color: #1a237e;
      margin: 0 0 15px 0;
    }
    
    .recommendation-item {
      padding: 15px;
      margin: 10px 0;
      background: #f5f5f5;
      border-radius: 4px;
    }
    
    /* כותרת תחתונה */
    .footer {
      position: absolute;
      bottom: 20px;
      width: 100%;
      text-align: center;
      font-size: 12px;
      color: #666;
      padding: 10px 0;
      background: transparent;
      margin-top: 30px;
    }
    
    /* צבעי ציונים */
    .good { color: #4caf50; }
    .warning { color: #ff9800; }
    .poor { color: #f44336; }
    
    /* עיצוב עמוד שני */
    .vital-metric {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px;
      margin: 10px 0;
      background: #f9f9f9;
      border-radius: 4px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }
    
    .vital-metric-name {
      font-weight: 500;
      font-size: 14px;
    }
    
    .vital-metric-value {
      display: flex;
      align-items: center;
    }
    
    .vital-metric-score {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-left: 10px;
      font-weight: bold;
      font-size: 12px;
      color: white;
    }
    
    .opportunity-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 0;
      border-bottom: 1px solid #f0f0f0;
      font-size: 15px;
    }
    
    .opportunity-item:last-child {
      border-bottom: none;
    }
    
    .score-circle {
      position: relative;
      width: 120px;
      height: 120px;
      margin: 0 auto;
    }
    
    .score-circle svg {
      width: 120px;
      height: 120px;
      transform: rotate(-90deg);
    }
    
    .score-circle-bg {
      fill: none;
      stroke: #eee;
      stroke-width: 8;
    }
    
    .score-circle-value {
      fill: none;
      stroke-width: 8;
      stroke-linecap: round;
      transition: stroke-dashoffset 0.3s;
    }
    
    .score-number {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 36px;
      font-weight: bold;
    }
    
    .scores-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
      width: 80%;
      margin: 0 auto;
    }
    
    .score-card {
      background: white;
      border-radius: 8px;
      padding: 25px 15px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      text-align: center;
      height: 130px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    
    .score-card-title {
      font-size: 18px;
      margin-bottom: 15px;
      color: #555;
    }
    
    .score-card-value {
      font-size: 32px;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- עמוד ראשון - סקירה כללית -->
    <div class="page">
      <header class="header">
        <div class="header-content-right">
          <h1 class="title">דוח ביצועי אתר</h1>
          <div class="site-url">${reportData.siteUrl}</div>
          <p class="header-name">${name ? name : "לקוח יקר"}</p>
        </div>
        <div class="report-date">
          ${new Date().toLocaleDateString("he-IL")}
        </div>
        <p class="header-cta">מעוניינים לקבל ייעוץ אישי לשיפור האתר חינם?</p>
        <p class="header-phone">דברו איתנו: 0548238818</p>
      </header>

      <div class="score-section" style="margin-top: 40px; padding-bottom: 60px; position: relative;">
        <h2 style="margin-bottom: 15px; color: #1a237e;">ציון AXIS</h2>
        <div style="padding: 20px 0 40px 0; position: relative;">
          <div class="score-circle" style="overflow: visible;">
            <svg viewBox="0 0 36 36" style="overflow: visible;">
              <path class="score-circle-bg"
                d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
              />
              <path class="score-circle-value ${getScoreClass(
                Math.round(
                  (reportData.scores.performance +
                    reportData.scores.seo +
                    reportData.scores.accessibility +
                    reportData.scores.bestPractices) /
                    4
                )
              )}"
                d="M18 2.5 a 15.5 15.5 0 0 1 0 31 a 15.5 15.5 0 0 1 0 -31"
                stroke-dasharray="${
                  (Math.round(
                    (reportData.scores.performance +
                      reportData.scores.seo +
                      reportData.scores.accessibility +
                      reportData.scores.bestPractices) /
                      4
                  ) *
                    97.5) /
                  100
                } 97.5"
                stroke="${
                  Math.round(
                    (reportData.scores.performance +
                      reportData.scores.seo +
                      reportData.scores.accessibility +
                      reportData.scores.bestPractices) /
                      4
                  ) >= 90
                    ? "#4caf50"
                    : Math.round(
                        (reportData.scores.performance +
                          reportData.scores.seo +
                          reportData.scores.accessibility +
                          reportData.scores.bestPractices) /
                          4
                      ) >= 70
                    ? "#ff9800"
                    : "#f44336"
                }"
              />
            </svg>
            <div class="score-number ${getScoreClass(
              Math.round(
                (reportData.scores.performance +
                  reportData.scores.seo +
                  reportData.scores.accessibility +
                  reportData.scores.bestPractices) /
                  4
              )
            )}">
              ${Math.round(
                (reportData.scores.performance +
                  reportData.scores.seo +
                  reportData.scores.accessibility +
                  reportData.scores.bestPractices) /
                  4
              )}
            </div>
          </div>
        </div>
        <p style="margin-top: 15px; color: #555;">הציון הכולל מבוסס על ממוצע של ארבעה מדדים: ביצועים, SEO, נגישות ואיכות הקוד</p>
      </div>

      <div class="scores-grid" style="margin-top: 60px; margin-bottom: 60px;">
        <div class="score-card">
          <div class="score-card-title">ביצועים</div>
          <div class="score-card-value ${getScoreClass(
            reportData.scores.performance
          )}">${reportData.scores.performance}</div>
        </div>
        <div class="score-card">
          <div class="score-card-title">SEO</div>
          <div class="score-card-value ${getScoreClass(
            reportData.scores.seo
          )}">${reportData.scores.seo}</div>
        </div>
        <div class="score-card">
          <div class="score-card-title">נגישות</div>
          <div class="score-card-value ${getScoreClass(
            reportData.scores.accessibility
          )}">${reportData.scores.accessibility}</div>
        </div>
        <div class="score-card">
          <div class="score-card-title">איכות הקוד</div>
          <div class="score-card-value ${getScoreClass(
            reportData.scores.bestPractices
          )}">${reportData.scores.bestPractices}</div>
        </div>
      </div>
      
      <footer class="footer">
        <div>הדוח נוצר באופן אוטומטי על ידי מערכת סריקת אתרים AXIS</div>
        <div style="margin-top: 5px;">לקבלת ייעוץ מקצועי, התקשרו אלינו: 0548238818</div>
      </footer>
    </div>

    <!-- עמוד שני - מדדי ליבה -->
    <div class="page">
      <header class="header">
        <div class="header-content-right">
          <h1 class="title">דוח ביצועי אתר</h1>
          <div class="site-url">${reportData.siteUrl}</div>
          <p class="header-name">${name ? name : "לקוח יקר"}</p>
        </div>
        <div class="report-date">
          ${new Date().toLocaleDateString("he-IL")}
        </div>
        <p class="header-cta">מעוניינים לקבל ייעוץ אישי לשיפור האתר חינם?</p>
        <p class="header-phone">דברו איתנו: 0548238818</p>
      </header>

      <div class="category" style="margin-top: 40px;">
        <h2 class="category-title">מדדי Core Web Vitals</h2>
        <p style="margin-bottom: 25px; font-size: 14px;">מדדים אלו משפיעים ישירות על חווית המשתמש ודירוג האתר בגוגל</p>
        
        <div class="vital-metric">
          <div class="vital-metric-name">זמן הופעת תוכן ראשון (FCP)</div>
          <div class="vital-metric-value">
            <div class="vital-metric-score" style="background-color: ${
              reportData.coreWebVitals.firstContentfulPaint.score >= 90
                ? "#4caf50"
                : reportData.coreWebVitals.firstContentfulPaint.score >= 70
                ? "#ff9800"
                : "#f44336"
            }">
              ${Math.round(reportData.coreWebVitals.firstContentfulPaint.score)}
            </div>
            <span>${reportData.coreWebVitals.firstContentfulPaint.value}</span>
          </div>
        </div>
        
        <div class="vital-metric">
          <div class="vital-metric-name">זמן הופעת התוכן הגדול (LCP)</div>
          <div class="vital-metric-value">
            <div class="vital-metric-score" style="background-color: ${
              reportData.coreWebVitals.largestContentfulPaint.score >= 90
                ? "#4caf50"
                : reportData.coreWebVitals.largestContentfulPaint.score >= 70
                ? "#ff9800"
                : "#f44336"
            }">
              ${Math.round(
                reportData.coreWebVitals.largestContentfulPaint.score
              )}
            </div>
            <span>${
              reportData.coreWebVitals.largestContentfulPaint.value
            }</span>
          </div>
        </div>
        
        <div class="vital-metric">
          <div class="vital-metric-name">זמן חסימה כולל (TBT)</div>
          <div class="vital-metric-value">
            <div class="vital-metric-score" style="background-color: ${
              reportData.coreWebVitals.totalBlockingTime.score >= 90
                ? "#4caf50"
                : reportData.coreWebVitals.totalBlockingTime.score >= 70
                ? "#ff9800"
                : "#f44336"
            }">
              ${Math.round(reportData.coreWebVitals.totalBlockingTime.score)}
            </div>
            <span>${reportData.coreWebVitals.totalBlockingTime.value}</span>
          </div>
        </div>
        
        <div class="vital-metric">
          <div class="vital-metric-name">קפיצות תוכן מצטברות (CLS)</div>
          <div class="vital-metric-value">
            <div class="vital-metric-score" style="background-color: ${
              reportData.coreWebVitals.cumulativeLayoutShift.score >= 90
                ? "#4caf50"
                : reportData.coreWebVitals.cumulativeLayoutShift.score >= 70
                ? "#ff9800"
                : "#f44336"
            }">
              ${Math.round(
                reportData.coreWebVitals.cumulativeLayoutShift.score
              )}
            </div>
            <span>${reportData.coreWebVitals.cumulativeLayoutShift.value}</span>
          </div>
        </div>
        
        <div class="vital-metric">
          <div class="vital-metric-name">מדד מהירות (Speed Index)</div>
          <div class="vital-metric-value">
            <div class="vital-metric-score" style="background-color: ${
              reportData.coreWebVitals.speedIndex.score >= 90
                ? "#4caf50"
                : reportData.coreWebVitals.speedIndex.score >= 70
                ? "#ff9800"
                : "#f44336"
            }">
              ${Math.round(reportData.coreWebVitals.speedIndex.score)}
            </div>
            <span>${reportData.coreWebVitals.speedIndex.value}</span>
          </div>
        </div>
        
        <div class="vital-metric">
          <div class="vital-metric-name">זמן לאינטראקטיביות (TTI)</div>
          <div class="vital-metric-value">
            <div class="vital-metric-score" style="background-color: ${
              reportData.coreWebVitals.interactive.score >= 90
                ? "#4caf50"
                : reportData.coreWebVitals.interactive.score >= 70
                ? "#ff9800"
                : "#f44336"
            }">
              ${Math.round(reportData.coreWebVitals.interactive.score)}
            </div>
            <span>${reportData.coreWebVitals.interactive.value}</span>
          </div>
        </div>
      </div>

      <footer class="footer">
        <div>הדוח נוצר באופן אוטומטי על ידי מערכת סריקת אתרים AXIS</div>
        <div style="margin-top: 5px;">לקבלת ייעוץ מקצועי, התקשרו אלינו: 0548238818</div>
      </footer>
    </div>
    
    <!-- עמוד שלישי - הזדמנויות לשיפור -->
    <div class="page">
      <header class="header">
        <div class="header-content-right">
          <h1 class="title">דוח ביצועי אתר</h1>
          <div class="site-url">${reportData.siteUrl}</div>
          <p class="header-name">${name ? name : "לקוח יקר"}</p>
        </div>
        <div class="report-date">
          ${new Date().toLocaleDateString("he-IL")}
        </div>
        <p class="header-cta">מעוניינים לקבל ייעוץ אישי לשיפור האתר חינם?</p>
        <p class="header-phone">דברו איתנו: 0548238818</p>
      </header>

      <div class="recommendations" style="margin-top: 40px;">
        <h2 class="recommendations-title">הזדמנויות לשיפור</h2>
        <p style="margin-bottom: 25px; font-size: 14px;">נקודות שכדאי לטפל בהן כדי לשפר את ביצועי האתר</p>
        
        <div class="opportunity-item">
          <span>משאבים החוסמים רינדור</span>
          <span>${translatePotentialSavings(
            reportData.opportunity.renderBlockingResources
          )}</span>
        </div>
        
        <div class="opportunity-item">
          <span>חוקי CSS שאינם בשימוש</span>
          <span>${translatePotentialSavings(
            reportData.opportunity.unusedCssRules
          )}</span>
        </div>
        
        <div class="opportunity-item">
          <span>קוד JavaScript שאינו בשימוש</span>
          <span>${translatePotentialSavings(
            reportData.opportunity.unusedJavascript
          )}</span>
        </div>
        
        <div class="opportunity-item">
          <span>קבצי CSS לא מכווצים</span>
          <span>${translatePotentialSavings(
            reportData.opportunity.unminifiedCss
          )}</span>
        </div>
        
        <div class="opportunity-item">
          <span>קבצי JavaScript לא מכווצים</span>
          <span>${translatePotentialSavings(
            reportData.opportunity.unminifiedJavascript
          )}</span>
        </div>
        
        <div class="opportunity-item">
          <span>פורמט תמונות מודרני</span>
          <span>${translatePotentialSavings(
            reportData.opportunity.modernImageFormats
          )}</span>
        </div>
        
        <div class="opportunity-item">
          <span>זמן תגובת שרת</span>
          <span>${translatePotentialSavings(
            reportData.opportunity.serverResponseTime
          )}</span>
        </div>
      </div>

      <footer class="footer">
        <div>הדוח נוצר באופן אוטומטי על ידי מערכת סריקת אתרים AXIS</div>
        <div style="margin-top: 5px;">לקבלת ייעוץ מקצועי, התקשרו אלינו: 0548238818</div>
      </footer>
    </div>
  </div>
</body>
</html>
`;
