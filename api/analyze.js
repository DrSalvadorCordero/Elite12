export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { desc } = req.body;

    const prompt = `
Eres un dermatólogo estético de alto nivel.

Analiza este caso:
"${desc}"

Responde en este formato:

Evaluación inicial:
(qué se observa sin diagnosticar)

Qué significa:
(interpretación estética)

Plan por etapas:
(orden lógico clínico)

Nota final:
(invitar a valoración presencial sin sonar comercial)
    `;

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt
      })
    });

    const data = await response.json();

    const text = data.output[0].content[0].text;

    return res.status(200).json({ text });

  } catch (error) {
    return res.status(500).json({
      error: "Error en IA"
    });
  }
}
