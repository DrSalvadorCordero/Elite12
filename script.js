async function analyze(){
const file=document.getElementById("image").files[0];
const desc=document.getElementById("desc").value;

const img=new Image();
img.src=URL.createObjectURL(file);

img.onload=()=>drawOverlay(img);

document.getElementById("result").innerText="Analizando...";

const res=await fetch("/api",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({desc})
});

const data=await res.json();

document.getElementById("result").innerText=data.text;

const msg=encodeURIComponent("Evaluación:\n\n"+data.text);

document.getElementById("whatsappBtn").href="https://wa.me/TUNUMERO?text="+msg;
document.getElementById("whatsappBtn").innerText="Continuar por WhatsApp";
}
