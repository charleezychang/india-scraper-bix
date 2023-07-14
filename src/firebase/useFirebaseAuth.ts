import { getAuth, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import initFirebase from "./config";
import { User } from "../interfaces";

function useFirebaseAuth() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  initFirebase()
  const auth = getAuth();
  const router = useRouter();
  const authStateChangeHandler = (authState: any) => {
    console.log(authState)
    if (!authState) {
      console.log('no auth state')
      router.push("/login");
      setAuthUser(null);
      setLoading(false);
    } else {
      console.log('has auth state')

      setAuthUser(authState);
      setLoading(false);
      router.push("/decks");
    }
  };
  const handleLogout = () => {
    router.push("/login");
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
