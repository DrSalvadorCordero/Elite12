async function analyze() {
  try {
    const file = document.getElementById("image").files[0];
    const desc = document.getElementById("desc").value;

    if (!file) {
      document.getElementById("result").innerText = "Selecciona una imagen.";
      return;
    }

    document.getElementById("result").innerText = "Analizando...";
    document.getElementById("whatsappBtn").innerText = "";

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ desc })
    });

    if (!res.ok) {
      throw new Error("Error en servidor");
    }

    const data = await res.json();

    if (!data.text) {
      throw new Error("Respuesta vacía");
    }

    document.getElementById("result").innerText = data.text;

    const msg = encodeURIComponent("Evaluación:\n\n" + data.text);

    const btn = document.getElementById("whatsappBtn");
    btn.href = "https://wa.me/5219992809758?text=" + msg;
    btn.innerText = "Continuar por WhatsApp";

  } catch (error) {
    document.getElementById("result").innerText =
      "Error: " + error.message;
  }
}
