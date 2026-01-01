import { appendToSheet } from "./sheetsService";

export async function getPhoneFromScan(url) {
  const siteData = await fetch(url);
  const html = await siteData.text();

  const telLinkRegex = /href=["']tel:([^"']+)["']/g;
  const telMatches = [...html.matchAll(telLinkRegex)].map((match) => match[1]);

  const phoneRegex =
    /(?:(?:\+972|0)(?:-)?(?:5[0-9]|[2-4]|[8-9]|7[0-9])?[-\s]?[0-9]{3}[-\s]?[0-9]{4})/g;
  const textMatches = html.match(phoneRegex) || [];

  const cleanPhoneNumber = (phone) => {
    let cleaned = phone.replace(/[^\d+]/g, "");

    if (cleaned.startsWith("+972")) {
      cleaned = "0" + cleaned.slice(4);
    }

    if (cleaned.length === 10) {
      return cleaned;
    }
    return null;
  };

  const allPhones = [...telMatches, ...textMatches];
  const cleanedPhones = allPhones
    .map(cleanPhoneNumber)
    .filter((phone) => phone !== null);

  const uniquePhones = [...new Set(cleanedPhones)];

  const res = await appendToSheet(url, uniquePhones);

  if(res.status !== 200)
    return false;

  return true;

}
