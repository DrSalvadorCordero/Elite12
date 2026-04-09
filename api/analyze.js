export default async function handler(req, res) {
  try {
    const { desc } = req.body;

    return res.status(200).json({
      text: "Evaluación inicial:\n\nSe observa intención de mejorar la estructura nasal. Requiere valoración clínica para definir dorso, proyección y punta."
    });

  } catch (error) {
    return res.status(500).json({
      error: error.message
    });
  }
}
