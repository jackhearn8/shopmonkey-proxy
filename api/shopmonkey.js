export default async function handler(req, res) {
  // Handle GET requests (browser test)
  if (req.method === "GET") {
    return res.status(200).json({ status: "ok", info: "Shopmonkey proxy live" });
  }

  // Handle POST requests (Shopmonkey webhooks)
  if (req.method === "POST") {
    try {
      // ✅ Respond immediately so Shopmonkey sees 200 OK
      res.status(200).json({ status: "ok" });

      // 🔁 Forward payload to your Google Apps Script
      const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxeekxuerKB4aWlbFDAdxrrWbPHOgLakb0rxaYwvurPe13CwjbQQ975iBhoaHpJIKXjuw/exec"; // <-- replace this

      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(req.body || {}),
      });

      console.log("Forwarded Shopmonkey payload:", req.body);
    } catch (err) {
      console.error("Error forwarding webhook:", err);
    }
    return; // end after responding
  }

  // All other methods
  return res.status(405).json({ error: "Method not allowed" });
}
