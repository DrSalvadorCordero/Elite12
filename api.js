export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Método no permitido" });
    }

    const { desc } = req.body || {};

    if (!desc) {
      return res.status(400).json({ error: "Falta descripción" });
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
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-5",
        input: prompt
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Error OpenAI:", data);
      return res.status(response.status).json({
        error: data?.error?.message || "Error al consultar OpenAI"
      });
    }

    const text =
      data?.output?.[0]?.content?.[0]?.text ||
      "No se pudo generar análisis.";

    return res.status(200).json({ text });

  } catch (error) {
    console.error("Error API:", error);
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}
