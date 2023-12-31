'use client'

import initFirebase from '../src/firebase/config'
import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'
import { Spinner } from '@chakra-ui/react'

export default function Home() {
  const { loading } = useFirebaseAuth()
  initFirebase()

  return (
    <div className='tw-flex tw-items-center tw-justify-center tw-h-screen tw-bg-[#0A0A0A]'>
      {loading && <Spinner size='xl' color='brand.primary' />}
    </div>
  );
}