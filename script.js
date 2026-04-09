async function analyze() {
  const file = document.getElementById("image").files[0];
  const desc = document.getElementById("desc").value.trim();

  if (!file) {
    alert("Selecciona una imagen");
    return;
  }

  if (!desc) {
    alert("Escribe una descripción");
    return;
  }

  const img = new Image();
  img.src = URL.createObjectURL(file);

  img.onload = () => {
    if (typeof drawOverlay === "function") {
      drawOverlay(img);
    }
  };

  document.getElementById("result").innerText = "Analizando...";

  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ desc })
    });

    const data = await res.json();

    if (!res.ok) {
      document.getElementById("result").innerText =
        "Error: " + (data.detail?.error?.message || data.error || "No se pudo analizar");
      return;
    }

    document.getElementById("result").innerText = data.text;

    const msg = encodeURIComponent("Evaluación:\n\n" + data.text);
    const btn = document.getElementById("whatsappBtn");
    btn.href = "https://wa.me/5219992809758?text=" + msg;
    btn.innerText = "Continuar por WhatsApp";
  } catch (error) {
    document.getElementById("result").innerText =
      "Error de conexión: " + error.message;
  }
}
