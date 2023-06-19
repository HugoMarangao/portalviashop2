export async function enviarnotificacao(title, body, id, link, image,icon) {
  const dados = {
    title,
    body,
    id,
    link,
    image,
    icon
  };

  const resultado = await fetch("/api/notificacoes", {
    method: "POST", // Corrigido o erro de digitação: 'mathod' para 'method'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  });

  console.log(resultado);
}
