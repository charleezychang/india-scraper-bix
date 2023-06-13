import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  const router = useRouter();
  const authStateChangeHandler = (authState: any) => {
    if (!authState) {
      router.push("/");
      setAuthUser(null);
      setLoading(false);
    } else {
      setAuthUser(authState);
      setLoading(false);
    }
  };
  const handleLogout = () => {
    signOut(auth).then((res) => {
      // clear cookies
      // update databaseZ
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authStateChangeHandler);

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user: authUser,
    loading: loading,
    logOut: handleLogout,
  };
}

export default useFirebaseAuth;
