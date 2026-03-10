import type { VercelRequest, VercelResponse } from "@vercel/node";

const N8N_WEBHOOK_URL = "https://n8n.liftlegal.com/webhook/workright-contact";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();
    return res.status(response.status).json(data);
  } catch {
    return res.status(500).json({ error: "Failed to submit form" });
  }
}
