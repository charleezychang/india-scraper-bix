'use client';
import initFirebase from '../src/firebase/config'
import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'
import { Spinner } from '@chakra-ui/react'
import Image from 'next/image';
import background from '../src/assets/images/background.svg'

export default function Home(props: any) {
  initFirebase()
  const { user, loading, logOut } = useFirebaseAuth()

  return (
    <div className='flex items-center justify-center h-screen bg-[#0A0A0A]'>
      {loading && <Spinner size='xl' color='brand.primary' />}
    </div>
  );
}