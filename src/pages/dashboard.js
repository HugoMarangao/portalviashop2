import Principal from "@/Components/Principal";
import withAuth from "@/Components/VerificacaoLogin/withAuth";
import { useRouter } from "next/router";
const Dashboard = () => {
  const router = useRouter();
  const { userId } = router.query;
  if (!userId) {
    return <div>Carregando...</div>; // Ou qualquer indicador de carregamento que você preferir
  }

  console.log(userId);
  return (
    <>
      <Principal  userId={userId}/>
    </>
  );
};

export default withAuth(Dashboard);
