function drawOverlay(img){
const canvas=document.getElementById("canvas");
const ctx=canvas.getContext("2d");

canvas.width=img.width;
canvas.height=img.height;

ctx.drawImage(img,0,0);

// ojeras
let grad=ctx.createRadialGradient(150,200,10,150,200,80);
grad.addColorStop(0,"rgba(255,0,0,0.4)");
grad.addColorStop(1,"transparent");
ctx.fillStyle=grad;
ctx.beginPath();
ctx.arc(150,200,80,0,Math.PI*2);
ctx.fill();

// arrugas
ctx.strokeStyle="yellow";
ctx.lineWidth=2;
ctx.beginPath();
ctx.moveTo(100,100);
ctx.bezierCurveTo(150,90,200,110,250,100);
ctx.stroke();

// piel textura
ctx.fillStyle="rgba(0,0,255,0.1)";
ctx.fillRect(0,0,img.width,img.height);
}
