import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

const withAuth = (Component) => {
  const AuthWrapper = (props) => {
    const router = useRouter();
    const auth = getAuth();

    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (!user) {
          router.push("/");
        }
      });

      return () => unsubscribe();
    }, []);

    return <Component {...props} />;
  };

  return AuthWrapper;
};

export default withAuth;
