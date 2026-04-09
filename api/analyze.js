export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { desc } = req.body;

    const prompt = `
Eres un dermatólogo estético con criterio avanzado en armonización facial.

Analiza este caso:
"${desc}"

Responde con precisión, sin rodeos y con autoridad clínica.

Estructura conceptual, no literal:

Lectura:
Describe lo que consideras que ocurre en la estructura, brindando descripciones utiles para que quien lo lea entienda el por qué de los cambios que necesirará, sin adornos.

Implicación:
Cómo afecta específicamente la armonía facial (no generalidades).

Dirección:
Qué se tendría que ajustar o evaluar para corregirlo (enfocado, sin explicar todo el procedimiento).

Cierre:
Invita a valoración presencial de forma directa y natural con el Dr. Salvador Cordero.

Reglas:
- Máximo 90-120 palabras
- Frases más cortas
- Evita lenguaje literario o emocional
- No expliques de más
- Debe sentirse como criterio, no como explicación
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

    const text =
      data.output?.[0]?.content?.[0]?.text ||
      "No se pudo generar respuesta.";

    return res.status(200).json({ text });

  } catch (error) {
    return res.status(500).json({
      error: "Error en IA"
    });
  }
}
