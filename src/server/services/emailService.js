import { Resend } from "resend";

export async function sendEmail(pdfFile, siteUrl, name, email) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const safeUrl = siteUrl
      .replace(/^https?:\/\//, "")
      .replace(/[\/\?&:]/g, "_");
    const today = new Date().toISOString().slice(0, 10);

    const response = await resend.emails.send({
      from: "סטודיו אקסיס | סורק אתרים <noreply@axistudio.co.il>",
      to: email,
      subject: `היי ${name}, הניתוח של האתר שלך מוכן 📊 `,
      html: `
        <div dir="rtl" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: white; background-color: #111111;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: white; font-size: 24px; margin-bottom: 10px;">הדוח שלך מוכן! 📊 </h1>
            <p style="color: #E59A2E; font-size: 18px; margin-bottom: 20px;">תודה שבחרת להשתמש בכלי הסריקה שלנו</p>
          </div>
          
          <div style="background-color: #1f1f1f; padding: 20px; border-radius: 10px; margin-bottom: 30px;">
            <p style="margin-bottom: 15px;">היי ${name},</p>
            <p style="margin-bottom: 15px;">סיימנו לנתח את האתר שלך ${siteUrl} 🔍</p>
            <p style="margin-bottom: 15px;">מצורף הדוח המלא עם כל הממצאים והמלצות לשיפור.</p>
          </div>

          <div style="text-align: center; margin-bottom: 30px;">
            <p style="color: #E59A2E; font-size: 16px; margin-bottom: 10px;">מקווים שתמצאו ערך בדוח!</p>
            <p style="font-size: 14px;">צוות AXIS תמיד כאן לעזור 🤖</p>
            <p style="font-size: 14px;">נתקלתם בבעיה או רוצים לשמוע איך לשפר את התוצאות? חייגו 054-8238818</p>
          </div>
          
          <div style="text-align: center; font-size: 12px; color: #888888;">
            <p>© ${new Date().getFullYear()} AXIS Studio. All rights reserved.</p>
          </div>
        </div>
      `,
      attachments: [
        {
          filename: `AXIS_WebsiteReport_${safeUrl}_${today}.pdf`,
          content: Buffer.from(pdfFile),
        },
      ],
    });

    return response;
  } catch (error) {
    console.error("Error sending email: ", error);
    throw error;
  }
}
