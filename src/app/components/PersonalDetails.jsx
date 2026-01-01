"use client";
import { useState } from "react";
import { SYSTEM_MESSAGES } from "../constants/messages";
import { useScan } from "./WebScanContext";
import { validators, validateForm } from "../utils/validators";

export default function PersonalDetails({ onNext }) {
  const { updateScanData } = useScan();

  const sessionId = sessionStorage.getItem("reportSessionId");

  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const sendReportHandler = async (e) => {
    e.preventDefault();

    const validation = validateForm(formData);

    if (!validation.isValid) {
      setStatusMessage(Object.values(validation.errors)[0]);
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      setIsLoading(false);
      setStatusMessage(SYSTEM_MESSAGES.PERSONAL_DETAILS.statusMessage.required);
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sessionId: sessionId,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
        }),
      });
      if (!response.ok) {
        setStatusMessage(SYSTEM_MESSAGES.PERSONAL_DETAILS.statusMessage.fail);
        return;
      }

      setStatusMessage(SYSTEM_MESSAGES.PERSONAL_DETAILS.statusMessage.success);
      updateScanData({ personalDetails: { ...formData } });
      onNext();
    } catch (error) {
      setStatusMessage(SYSTEM_MESSAGES.PERSONAL_DETAILS.statusMessage.fail);
    } finally {
      setIsLoading(false);
    }

    sessionStorage.removeItem("reportSessionId");
  };

  return (
    <section className="flex flex-col justify-center items-center text-white gap-8 mt-10">
      <h2 className="">{SYSTEM_MESSAGES.PERSONAL_DETAILS.title}</h2>

      <form
        onSubmit={sendReportHandler}
        className="w-full flex flex-col justify-center items-center gap-4"
      >
        <div className="relative w-4/6 md:w-2/6">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full h-12 rounded-full text-black indent-3"
            placeholder={SYSTEM_MESSAGES.PERSONAL_DETAILS.form.name}
            required
          />
          {formData.name && validators.name(formData.name) && (
            <span className="absolute left-10 top-3 text-green-500">✓</span>
          )}
        </div>

        <div className="relative w-4/6 md:w-2/6">
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full h-12 rounded-full text-black indent-3"
            placeholder={SYSTEM_MESSAGES.PERSONAL_DETAILS.form.email}
            required
          />
          {formData.email && validators.email(formData.email) && (
            <span className="absolute left-10 top-3 text-green-500">✓</span>
          )}
        </div>

        <div className="relative w-4/6 md:w-2/6">
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full h-12 rounded-full text-black indent-3"
            dir="rtl"
            placeholder={SYSTEM_MESSAGES.PERSONAL_DETAILS.form.phone}
            required
          />
          {formData.phone && validators.phone(formData.phone) && (
            <span className="absolute left-10 top-3 text-green-500">✓</span>
          )}
        </div>

        {statusMessage && <p>{statusMessage}</p>}

        <button
          type="submit"
          disabled={isLoading}
          className={`w-4/6 md:w-2/6 h-12 flex justify-center items-center rounded-full bg-[#A9661C] relative text-xl mt-10 ${
            isLoading ? "opacity-75 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "שולח..." : "שלחו לי את הדו״ח למייל"}
        </button>
      </form>

      <p>{SYSTEM_MESSAGES.PERSONAL_DETAILS.safeDetails}</p>
    </section>
  );
}
