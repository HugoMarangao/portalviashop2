import { useState } from "react";
import SignIn from "@/Components/SigIn";


export default function Home() {
  const [showSignUp, setShowSignUp] = useState(false);

  const toggleSignUp = () => {
    setShowSignUp(!showSignUp);
  };

  return (
    <>
     <SignIn />
    </>
  );
}
