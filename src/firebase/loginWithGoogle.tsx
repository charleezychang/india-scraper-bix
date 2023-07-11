import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import { Box, Button } from "@chakra-ui/react";
import PrimaryButton from "../components/PrimaryButton";

function LoginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();

  const handleLogin = () => {


    signInWithPopup(auth, provider)
      .then((res) => {
        const user = res.user;
        console.log(user)
        router.push("/decks");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PrimaryButton displayText='Continue with Google' onClick={handleLogin}/>
    </>

  );
}

export default LoginWithGoogle;
