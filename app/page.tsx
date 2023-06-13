'use client';
import initFirebase from '../src/firebase/config'
import LoginWithGoogle from '@/src/firebase/loginWithGoogle';

export default function Home(props: any) {
  initFirebase()

  return (
    <div>
      <h1>HELLO WORLD</h1>
      <LoginWithGoogle />
    </div>
  );
}