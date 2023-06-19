import { useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Novo estado para controle de carregamento
  const router = useRouter();
 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true); // Ativa o estado de carregamento
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userId = userCredential.user.uid;
      console.log("Login bem-sucedido:", userCredential.user);

      // Exibir notificação de sucesso
      toast.success("Login bem-sucedido!");

      // Redirecionar para a página Dashboard após o login bem-sucedido
      router.push({
        pathname: "/dashboard",
        query: { userId: userId }
      });
    } catch (err) {
      setError(err.message);

      // Exibir notificação de erro
      toast.error("Ocorreu um erro durante o login.");
    } finally {
      setIsLoading(false); // Desativa o estado de carregamento
    }
  };

  return (
    <div className={styles.container}>
      <h1>LH WEB</h1>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="E-mail"
          />
        </label>
        <br />
        <label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Senha"
          />
        </label>
        <br />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Carregando..." : "Entrar"}
        </button> {/* Alteração do texto do botão com base no estado de carregamento */}
      </form>
      <Link href={"/criarConta"}>Criar conta</Link>
    </div>
  );
};

export default SignIn;
