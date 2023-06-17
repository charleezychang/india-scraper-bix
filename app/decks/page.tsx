'use client'

import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'
import useImportCards from '@/src/hooks/useImportCards'

function Page() {
    const {user, loading, logOut } = useFirebaseAuth()
    const { scrapeWebsite, testScrape } = useImportCards()

    const handleImportCards = () => {
        console.log(process.env.SCRAPER_API_API_KEY)
        // scrapeWebsite(`https://api.scraperapi.com?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=https://www.indiabix.com/chemical-engineering/chemical-engineering-basics/171010`)
        testScrape(`https://api.scraperapi.com?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=https://www.indiabix.com/chemical-engineering/chemical-engineering-basics/171010`)
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