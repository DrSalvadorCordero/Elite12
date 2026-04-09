export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método no permitido" });
  }

  try {
    const { desc } = req.body;

    // Aquí luego conectaremos OpenAI
    const respuesta = `
Evaluación inicial:

Se observa una intención de mejora en la estructura nasal.

Esto generalmente implica ajuste en:
- Dorso nasal (rectificación o definición)
- Proyección de punta
- Balance con mentón y labios

Plan sugerido por etapas:
1. Evaluación estructural completa en consulta
2. Definición de puntos de soporte
3. Ajuste progresivo (no sobrecorrección)

Nota: La indicación precisa requiere valoración presencial.
    `;

    return res.status(200).json({
      text: respuesta.trim()
    });

  } catch (error) {
    return res.status(500).json({
      error: "Error interno del servidor"
    });
  }
}
