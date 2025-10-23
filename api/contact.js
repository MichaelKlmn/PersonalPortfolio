export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    console.log("New message received:", { name, email, message });

    return res
      .status(200)
      .json({ success: true, message: "Message sent successfully!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
