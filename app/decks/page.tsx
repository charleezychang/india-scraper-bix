'use client'

import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'
import useImportCards from '@/src/hooks/useImportCards'

function Page() {
    const {user, loading, logOut } = useFirebaseAuth()
    const { scrapeWebsite } = useImportCards()

    const handleImportCards = () => {
        scrapeWebsite('https://www.indiabix.com/chemical-engineering/chemical-engineering-basics/')
    }

    return (
        <>
        <h1>deck</h1>
        <button onClick={logOut}>logout</button>
        <button onClick={handleImportCards}>import</button>
        </>
    )
}

export default Page