'use client'

import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'

function Page() {
    const {user, loading, logOut } = useFirebaseAuth()

    return (
        <>
        <h1>deck</h1>
        <button onClick={logOut}>logout</button>
        </>
    )
}

export default Page