async function analyze() {
  try {
    const file = document.getElementById("image").files[0];
    const desc = document.getElementById("desc").value;
    const result = document.getElementById("result");
    const btn = document.getElementById("whatsappBtn");

    // Validación
    if (!file) {
      result.innerText = "Selecciona una imagen.";
      btn.style.display = "none";
      return;
    }

    // Estado inicial
    result.innerText = "Analizando...";
    btn.style.display = "none";

    // Llamada a backend
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ desc })
    });

    // Manejo de error HTTP
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(errorText || "Error en servidor");
    }

    // Parseo respuesta
    const data = await res.json();

    if (!data.text) {
      throw new Error("Respuesta vacía");
    }

    // Mostrar resultado
    result.innerText = data.text;

    // Generar WhatsApp
    const msg = encodeURIComponent("Evaluación:\n\n" + data.text);

    btn.href = "https://wa.me/5219992809758?text=" + msg;
    btn.innerText = "Continuar por WhatsApp";
    btn.style.display = "inline-block";

  } catch (error) {
    document.getElementById("result").innerText =
      "Error: " + error.message;

    document.getElementById("whatsappBtn").style.display = "none";
  }
}
