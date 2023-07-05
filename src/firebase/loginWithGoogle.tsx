import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

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
    <button type="button" onClick={() => handleLogin()}>
      Login
    </button>
  );
}

export default LoginWithGoogle;
