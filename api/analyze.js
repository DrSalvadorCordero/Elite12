export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { desc } = req.body || {};

    if (!desc || typeof desc !== "string") {
      return res.status(400).json({ error: "Falta la descripción" });
    }

    const prompt = `Analiza este caso estético:
${desc}

Responde:
1. Qué se observa
2. Qué significa
3. Plan por etapas

Lenguaje clínico elegante.
No diagnostiques.
Dirige a valoración.`;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: prompt
      })
    });

    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: "Error en OpenAI",
        detail: data
      });
    }

    const text =
      data.output?.[0]?.content?.[0]?.text ||
      "Sin respuesta";

    return res.status(200).json({ text });
  } catch (error) {
    return res.status(500).json({
      error: "Error en API",
      detail: error.message
    });
  }
}
