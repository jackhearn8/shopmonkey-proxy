export default async function handler(req, res) {
  // Respond to Shopmonkey immediately so it never times out
  if (req.method !== "POST") {
    return res.status(200).json({ status: "ready" });
  }

  try {
    res.status(200).json({ status: "ok" }); // instant success reply

    // Forward payload to your Google Apps Script webhook
    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxeekxuerKB4aWlbFDAdxrrWbPHOgLakb0rxaYwvurPe13CwjbQQ975iBhoaHpJIKXjuw/exec"; // <-- replace this

    await fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    console.log("Forwarded Shopmonkey payload:", req.body);
  } catch (err) {
    console.error("Error forwarding webhook:", err);
  }
}
