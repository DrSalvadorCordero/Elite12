async function analyze() {
  try {
    const file = document.getElementById("image").files[0];
    const desc = document.getElementById("desc").value;
    const result = document.getElementById("result");
    const btn = document.getElementById("whatsappBtn");

    if (!file) {
      result.innerText = "Selecciona una imagen.";
      btn.style.display = "none";
      return;
    }

    result.innerText = "Analizando...";
    btn.style.display = "none";

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

    result.innerText = data.text;

    const msg = encodeURIComponent("Evaluación:\n\n" + data.text);
    btn.href = "https://wa.me/5219992809758?text=" + msg;
    btn.style.display = "inline-block";
  } catch (error) {
    document.getElementById("result").innerText = "Error: " + error.message;
    document.getElementById("whatsappBtn").style.display = "none";
  }
}
