import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";
import PrimaryButton from "../components/PrimaryButton";

function LoginWithGoogle() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const router = useRouter();

  const handleLogin = () => {


    signInWithPopup(auth, provider)
      .then((res) => {
        router.push("/decks");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <PrimaryButton displayText='Continue with Google' onClick={handleLogin} />
    </>

  );
}

export default LoginWithGoogle;
