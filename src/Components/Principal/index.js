import { useState, useEffect } from "react";
import { enviarnotificacao } from "@/Servicos/notificacoes";
import styles from "./styles.module.scss";
import { collection, doc, getDoc, getDocs, query, where, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";
import { toast } from "react-toastify";
import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/router";
import { format } from "date-fns";

const Principal = ({userId}) => {
  const [titulo, setTitulo] = useState("");
  const [id, setId] = useState(userId);
  const [mensagem, setMensagem] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const router = useRouter();
  const [notificacoes, setNotificacoes] = useState([]);
  const [link, setLink] = useState("");
  const [image,setImage] = useState("");

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  };
  
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      // Enviar a notificação
      await enviarnotificacao(titulo, mensagem, id, link,image);

  
      // Salvar a notificação no Firestore
      const notificacoesRef = collection(
        db,
        "notificacoes",
        userId,
        "notificacoes"
      );
      await addDoc(notificacoesRef, {
        titulo,
        mensagem,
        id,
        dataEnviada: serverTimestamp() // Adicione a data atual usando serverTimestamp()
      });
  
      setMessageSent(true);
      setTitulo("");
      setMensagem("");
      setLink("");
      setImage("");
      toast.success("Notificacao Enviada");
    } catch (error) {
      console.log( error);
      toast.error("Ocorreu um erro", error);
    }
  };

  useEffect(() => {
    const fetchNotificacoes = async () => {
      try {
        const notificacoesRef = collection(
          db,
          "notificacoes",
          userId,
          "notificacoes"
        );
        const q = query(notificacoesRef);
        const querySnapshot = await getDocs(q);
        const notificacoesData = querySnapshot.docs.map((doc) => doc.data());
        setNotificacoes(notificacoesData);
      } catch (error) {
        console.error("Erro ao buscar as notificações:", error);
      }
    };

    fetchNotificacoes();
  }, [userId]);

  return (
    <div className={styles.Principal}>
       <button onClick={handleLogout}>Deslogar</button>
      <h1>LH WEB</h1>
      <form onSubmit={onSubmit} className={styles.for2}>
        <div className={styles.form2}>
          <input
            id="titulo"
            name="titulo"
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título:"
          />
        </div>
        <div className={styles.form2}>
          <label htmlFor="mensagem"></label>
          <input
            id="mensagem"
            name="mensagem"
            type="text"
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Mensagem:"
          />
        </div>
        <div className={styles.form2}>
          <label htmlFor="link"></label>
          <input
            id="link"
            name="link"
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            placeholder="Link:"
          />
        </div>
        <div className={styles.form2}>
          <label htmlFor="Image"></label>
          <input
            id="image"
            name="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="Image:"
          />
        </div>
        <div className={styles.form2}>
          <label htmlFor="Id"></label>
          <input
            id="Id"
            name="Id"
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Id:"
            readOnly
          />
        </div>
        <button type="submit" disabled={id === " " || id.length < 6}>
          Enviar
        </button>
       
      </form>     
      {/* <div className={styles.notificacoes}>
        <h2>Notificações</h2>
        {notificacoes.map((notificacao) => (
          <div key={notificacao.id} className={styles.notificacaoItem}>
            <h3>{notificacao.titulo}</h3>
            <p>{notificacao.mensagem}</p>
            <p>{format(notificacao.dataEnviada.toDate(), "dd/MM/yyyy HH:mm:ss")}</p>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default Principal;
