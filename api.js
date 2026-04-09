export default async function handler(req,res){
const {desc}=req.body;

const prompt=`Analiza este caso estético:
${desc}

Responde:
1. Qué se observa
2. Qué significa
3. Plan por etapas

Lenguaje clínico elegante.
No diagnostiques.
Dirige a valoración.`;

const response=await fetch("https://api.openai.com/v1/responses",{
method:"POST",
headers:{
"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,
"Content-Type":"application/json"
},
body:JSON.stringify({
model:"gpt-5",
input:prompt
})
});

const data=await response.json();

res.status(200).json({
text:data.output[0].content[0].text
});
}
