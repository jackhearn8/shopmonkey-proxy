import https from "https";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(200).json({ status: "ready" });
  }

  try {
    // immediate OK back to Shopmonkey
    res.status(200).json({ status: "ok", source: "vercel-proxy" });

    const GOOGLE_SCRIPT_URL =
      "https://script.google.com/macros/s/AKfycbwQNWvTJyKZdGpclxeCW_hFI4qFgYtSGmOPrIK5b3ii3q6L6iSZVxsq5hZam9nPCl6CFg/exec";

    // agent keeps socket open long enough for Google
    const agent = new https.Agent({ keepAlive: true });

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body || {}),
      dispatcher: agent,            // ensure node fetch uses our agent
      duplex: "half"                // silence undici warnings
    });

    console.log("➡️ Google response status:", response.status);
    console.log("➡️ Google response body:", await response.text());
  } catch (err) {
    console.error("❌ Forwarding error:", err);
  }
}
