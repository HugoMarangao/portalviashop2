import { collection, getDocs } from "firebase/firestore";

import { db } from "@/config/firebase";

export async function pegarTokensEmpresa(empresaId) {
  try {
    const tokensRef = collection(db, "tokens", empresaId, "tokens");
    const querySnapshot = await getDocs(tokensRef);
    const tokens = querySnapshot.docs.map((doc) => doc.data().token);
    return tokens;
  } catch (err) {
    console.log("Erro ao pegar token da empresa: ", err);
    return [];
  }
}
