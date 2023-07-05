'use client'

import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'
import useImportCards from '@/src/hooks/useImportCards'
import { ChangeEvent, useState } from 'react'

function Page() {
    const { user, loading, logOut } = useFirebaseAuth()
    const { scrapeWebsite, testScrape } = useImportCards()
    const [urlToScrape, setUrlToScrape] = useState('')

    const handleImportCards = () => {

        // scrapeWebsite(`https://api.scraperapi.com?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=https://www.indiabix.com/chemical-engineering/chemical-engineering-basics/171010`)
        console.log(urlToScrape)
        if (urlToScrape) {
            scrapeWebsite(`https://api.scraperapi.com?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=${urlToScrape}`)
            // testScrape(`https://api.scraperapi.com?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=${urlToScrape}`)
        }
    }

    const handleUrlToScrapeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrlToScrape(e.target.value)
    }

    return (
        <>
            <h1>deck</h1>
            <button onClick={logOut}>logout</button>
            <input type="text" onChange={handleUrlToScrapeChange} placeholder="Input url of a section's last page" />
            <button type="button" onClick={handleImportCards}>import</button>
        </>
    )
}

export default Page