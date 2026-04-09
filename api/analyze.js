export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { desc } = req.body;

    const prompt = `
Actúa como un dermatólogo estético de alto nivel, con criterio refinado y comunicación elegante.

Analiza este caso:
"${desc}"

Responde de forma breve, precisa y con autoridad.

Estructura:

1. Lectura estética:
Describe lo que probablemente ocurre sin afirmar diagnóstico.

2. Interpretación:
Qué impacto tiene en la armonía facial (sin generalidades).

3. Dirección:
Qué se debería evaluar o ajustar (sin explicar todo el tratamiento).

4. Cierre:
Invita a valoración presencial de forma natural, sin sonar comercial.

Reglas:
- Máximo 120-150 palabras
- Lenguaje sobrio, no didáctico
- No listas largas
- No explicaciones básicas
- Debe sentirse exclusivo, no genérico
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

    const text = data.output?.[0]?.content?.[0]?.text || "No se pudo generar respuesta.";

    return res.status(200).json({ text });

  } catch (error) {
    return res.status(500).json({
      error: "Error en IA"
    });
  }
}
