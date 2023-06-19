import { useState } from "react";
import styles from "./styles.module.scss";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/config/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router"; 

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Registro bem-sucedido:", userCredential.user);

      // Adicionar a nova empresa à coleção 'empresas'
      const companyDocRef = await addDoc(collection(db, "empresas"), {
        id: userCredential.user.uid,
        name: companyName,
        paymentDate: new Date(), // Definir a data de pagamento atual como exemplo
      });

      console.log("Empresa adicionada com sucesso:", companyDocRef.id);

      router.push("/dashboard");
      toast.success("Registro bem-sucedido!");
      setIsLoading(false); 
    } catch (err) {
      setError(err.message);
      toast.error("Ocorreu um erro ao criar a conta. Por favor, tente novamente.");
      setIsLoading(false); 
    }
  };

  return (
    <div className={styles.container}>
      <h1>Criar Conta</h1>
      <form onSubmit={handleSubmit}>
        <label>
         
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            placeholder=" Nome da empresa:"
          />
        </label>
        <br />
        <label>
         
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" E-mail:"
          />
        </label>
        <br />
        <label>
          
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Senha:"
          />
        </label>
        <br />
        <button type="submit">{isLoading ? "Carregando..." : "Criar Conta"}</button>
      </form>
      <Link href={'/'}>Ja Possui uma Conta? Faca Login!</Link>
    </div>
  );
};

export default SignUp;
