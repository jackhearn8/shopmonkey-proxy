export default async function handler(req, res) {
  // Accept only POSTs from Shopmonkey
  if (req.method !== "POST") {
    return res.status(200).json({ status: "ready" });
  }

  try {
    // ✅ Respond immediately to Shopmonkey so it doesn't timeout
    res.status(200).json({ status: "ok", source: "vercel-proxy" });

    // Replace with your real Apps Script URL
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwQNWvTJyKZdGpclxeCW_hFI4qFgYtSGmOPrIK5b3ii3q6L6iSZVxsq5hZam9nPCl6CFg/exec";

    console.log("📨 Incoming webhook from Shopmonkey at", new Date().toISOString());
    console.log("Forwarding to:", GOOGLE_SCRIPT_URL);

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
    });

    const text = await response.text();
    console.log("➡️ Google response status:", response.status);
    console.log("➡️ Google response body:", text);

  } catch (err) {
    console.error("❌ Error forwarding webhook:", err);
  }
}
