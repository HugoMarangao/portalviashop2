import { admin } from "@/config/firebaseAdmin";
import { pegarTokensEmpresa } from "@/Servicos/pegarTokensEmpresa";

export default async function handler(req, res) {
  const { title, body, id,link, image, icon} = req.body;

  const tokens = await pegarTokensEmpresa(id);


  const message = {
    notification: {
      title: title,
      body: body,
      image: encodeURI(image)
    },
    data: {
      url: link,
      icon: encodeURI(icon)
    },
    tokens: tokens,
  };
  

  try {
    const response = await admin.messaging().sendMulticast(message);
    console.log("Notificação enviada com sucesso!");
    console.log("Pessoas entregues:", response.successCount);
    console.log("Tokens com erro:", response.failureCount);
    res.status(200).json({
      status: "Notificação enviada com sucesso!",
      successCount: response.successCount
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: "Erro ao enviar",
      error: error.message,
    });
  }
}
