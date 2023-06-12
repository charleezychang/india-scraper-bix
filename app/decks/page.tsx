'use client'

import { getAuth, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'


function Page() {
    const auth = getAuth()
    const router = useRouter()
    const authStateChangeHandler = (authState: any) => {
        if (!authState) {
            router.push("/")
        }
    }
    const handleLogout = () => {
        signOut(auth)
            .then(res => {
                // clear cookies
                // update databaseZ
            })
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(authStateChangeHandler)

        return () => {
            unsubscribe()
        }
    }, [])


    return (
        <>
            <div>Page</div>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}

export default Page