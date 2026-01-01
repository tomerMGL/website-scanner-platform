import { google } from "googleapis";


const auth = new google.auth.GoogleAuth({
  keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = await google.sheets({ version: "v4", auth });

export async function appendToSheet(url, phones) {
  const dateTime = new Date();

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "PHONES!A:Z",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          url,
          phones.join("\n"),
          dateTime.toLocaleDateString(),
          dateTime.toLocaleTimeString(),
        ],
      ],
    },
  });

  return res;
}

export async function saveLead(url, name, email, phone, scores) {
  const dateTime = new Date();

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "LEADS!A:Z",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          url,
          name,
          email,
          phone,
          scores.performance,
          scores.accessibility,
          scores.bestPractices,
          scores.seo,
          dateTime.toLocaleDateString(),
          dateTime.toLocaleTimeString(),
        ],
      ],
    },
  });

  return res;
}

export async function saveSurvey(data) {
  const dateTime = new Date();

  const res = await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.SHEET_ID,
    range: "SURVEY!A:Z",
    valueInputOption: "RAW",
    requestBody: {
      values: [
        [
          data.url,
          data.name,
          data.email,
          data.phone,
          data.clarity,
          data.useful ? "כן" : "לא",
          data.moreTools ? "כן" : "לא",
          data.improvements,
          data.subscribeToUpdates ? "כן" : "לא",
          dateTime.toLocaleDateString(),
          dateTime.toLocaleTimeString(),
        ],
      ],
    },
  });

  return res;
}
