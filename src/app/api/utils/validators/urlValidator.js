export const validateUrl = (url) => {
  let cleanUrl = url.trim();

  if (!cleanUrl.startsWith("http://") && !cleanUrl.startsWith("https://")) {
    cleanUrl = "https://" + cleanUrl;
  }

  try {
    const urlObject = new URL(cleanUrl);

    if (
      urlObject.hostname === "localhost" ||
      urlObject.hostname === "127.0.0.1"
    ) {
      return {
        isValid: false,
        error: "לא ניתן לסרוק שרת מקומי (localhost)",
      };
    }

    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (ipPattern.test(urlObject.hostname)) {
      return {
        isValid: false,
        error: "לא ניתן להשתמש בכתובת IP",
      };
    }

    const parts = urlObject.hostname.split(".");
    if (parts.length < 2) {
      return {
        isValid: false,
        error: "כתובת חייבת לכלול דומיין ראשי ומשני",
      };
    }

    const invalidCharsPattern = /[^a-zA-Z0-9.-]/;
    if (invalidCharsPattern.test(urlObject.hostname)) {
      return {
        isValid: false,
        error: "כתובת מכילה תווים לא חוקיים",
      };
    }
    return {
      isValid: true,
      normalizedUrl: cleanUrl,
      urlObject: urlObject,
    };
  } catch (e) {
    return {
      isValid: false,
      error: "כתובת לא תקינה",
    };
  }
};
