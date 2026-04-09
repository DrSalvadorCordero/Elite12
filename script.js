async function analyze() {
  const resultEl = document.getElementById("result");
  const whatsappBtn = document.getElementById("whatsappBtn");
  const fileInput = document.getElementById("image");
  const descInput = document.getElementById("desc");

  try {
    const file = fileInput?.files?.[0];
    const desc = descInput?.value?.trim();

    if (!file) {
      resultEl.innerText = "Selecciona una imagen antes de analizar.";
      return;
    }

    if (!desc) {
      resultEl.innerText = "Escribe una descripción breve del caso.";
      return;
    }

    resultEl.innerText = "Analizando...";
    whatsappBtn.innerText = "";
    whatsappBtn.removeAttribute("href");

    const img = new Image();
    img.src = URL.createObjectURL(file);

    img.onload = () => {
      if (typeof drawOverlay === "function") {
        drawOverlay(img);
      }
    };

    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ desc })
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data?.error || "Falló el análisis");
    }

    resultEl.innerText = data?.text || "No se pudo generar el análisis.";

    const msg = encodeURIComponent("Evaluación:\n\n" + (data?.text || ""));
    whatsappBtn.href = "https://wa.me/5219992809758?text=" + msg;
    whatsappBtn.innerText = "Continuar por WhatsApp";

  } catch (error) {
    console.error("Error en analyze():", error);
    resultEl.innerText = "Hubo un error al analizar. Revisa la API o intenta de nuevo.";
  }
}
