'use client';
import initFirebase from '../src/firebase/config'
import LoginWithGoogle from '@/src/firebase/loginWithGoogle';
import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'

export default function Home(props: any) {
  initFirebase()
  const { user, loading, logOut } = useFirebaseAuth()

  return (
    <div>
      <h1>HELLO WORLD</h1>
      <LoginWithGoogle />
    </div>
  );
}