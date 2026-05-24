// Auto-reloaded portfolio data
import express from "express";
import cors from "cors";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import dotenv from "dotenv";
import { Resend } from "resend";

// Initialize environment variables
dotenv.config();

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const portfolio = JSON.parse(
  readFileSync(join(__dirname, "data", "portfolio.json"), "utf-8")
);

// Initialize Resend with API Key
const resend = new Resend(process.env.RESEND_API_KEY);

app.get("/api/portfolio", (_req, res) => {
  res.json(portfolio);
});

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Missing required fields (name, email, message)" });
  }
  console.log(`[CONTACT FORM] Message received from ${name} <${email}>: "${message}"`);

  // Check if Resend API Key is configured
  const apiKey = process.env.RESEND_API_KEY;
  const isConfigured = 
    apiKey && 
    apiKey.startsWith("re_") &&
    apiKey !== "re_your_api_key_here" &&
    apiKey !== "re_your_key_here" &&
    apiKey.trim() !== "";

  if (!isConfigured) {
    console.warn("[WARNING] RESEND_API_KEY is not configured in server/.env. Simulating message logged.");
    return res.json({ 
      success: true, 
      message: "COMMS LOGGED (SIMULATED). Add RESEND_API_KEY to .env." 
    });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "sasmithaupananda2221@gmail.com",
      subject: `New Portfolio Message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #00f2ff; padding: 25px; background-color: #0c0f1d; color: #ffffff; border-radius: 8px; box-shadow: 0 0 15px rgba(0, 242, 255, 0.15);">
          <h2 style="color: #00f2ff; border-bottom: 2px solid rgba(0, 242, 255, 0.2); padding-bottom: 12px; margin-top: 0; font-family: monospace; letter-spacing: 2px; text-transform: uppercase;">[ PORTFOLIO COMMS DECRYPTED ]</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr>
              <td style="font-weight: bold; color: #00f2ff; padding: 8px 0; width: 120px; font-family: monospace;">SENDER:</td>
              <td style="color: #e2e8f0; padding: 8px 0;">${name}</td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #00f2ff; padding: 8px 0; font-family: monospace;">RETURN COMMS:</td>
              <td style="color: #e2e8f0; padding: 8px 0;"><a href="mailto:${email}" style="color: #38bdf8; text-decoration: none; border-bottom: 1px dashed #38bdf8;">${email}</a></td>
            </tr>
            <tr>
              <td style="font-weight: bold; color: #00f2ff; padding: 8px 0; font-family: monospace;">TIMESTAMP:</td>
              <td style="color: #94a3b8; padding: 8px 0; font-size: 12px;">${new Date().toLocaleString()}</td>
            </tr>
          </table>
          
          <div style="background-color: rgba(0, 242, 255, 0.03); border: 1px solid rgba(0, 242, 255, 0.1); border-left: 4px solid #00f2ff; padding: 18px; font-family: 'Courier New', Courier, monospace; white-space: pre-wrap; font-size: 13px; color: #38bdf8; line-height: 1.6; border-radius: 4px;">
${message}
          </div>
          
          <div style="margin-top: 30px; border-top: 1px solid rgba(255, 255, 255, 0.1); padding-top: 15px; font-size: 10px; text-align: center; color: #64748b; font-family: monospace;">
            SYS_LINK // SECURE_PORTFOLIO_BACKEND // COMMS LINK ONLINE
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[ERROR] Resend API returned error:", error);
      return res.status(500).json({ error: error.message || "Failed to dispatch message via Resend." });
    }

    console.log(`[CONTACT FORM] Message successfully sent to sasmithaupananda2221@gmail.com using Resend (ID: ${data.id}).`);
    res.json({ success: true, message: "Transmission received. Secure connection logged." });
  } catch (error) {
    console.error("[ERROR] Failed to send email via Resend:", error);
    res.status(500).json({ error: "Comms dispatch failed. Connection terminated." });
  }
});

if (process.env.NODE_ENV === "production") {
  const clientDist = join(__dirname, "..", "client", "dist");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(join(clientDist, "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
