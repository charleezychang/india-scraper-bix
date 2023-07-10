'use client'

import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'
import useImportCards from '@/src/hooks/useImportCards'
import { Button, Card, CardBody, CardHeader, Text, Input } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import PrimaryButton from '@/src/components/PrimaryButton'

function Page() {
    const { user, loading, logOut } = useFirebaseAuth()
    const { scrapeWebsite, testScrape } = useImportCards()
    const [urlToScrape, setUrlToScrape] = useState('')

    const handleImportCards = () => {

        // scrapeWebsite(`https://api.scraperapi.com?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=https://www.indiabix.com/chemical-engineering/chemical-engineering-basics/171010`)
        console.log(urlToScrape)
        if (urlToScrape) {
            scrapeWebsite(`https://api?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=${urlToScrape}`)
            // testScrape(`https://api.scraperapi.com?api_key=${process.env.NEXT_PUBLIC_SCRAPER_API_SECRET_KEY}&url=${urlToScrape}`)
        }
    }

    const handleUrlToScrapeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUrlToScrape(e.target.value)
    }

    return (

        <div className='flex items-center justify-center h-screen'>
            <Card className='bg-[#242424] w-[300px] h-[220px] rounded-md p-4 items-center'>
                <CardHeader display="flex" alignItems="center" flexDirection='column'>
                    <Text className='text-white text-2xl'>Deck</Text>

                </CardHeader>
                <CardBody>
                    <Input placeholder="Input url of a section's last page" onChange={handleUrlToScrapeChange} />
                    <PrimaryButton displayText='Logout' onClick={logOut}/>
                    <PrimaryButton displayText='Import' onClick={handleImportCards}/>
                </CardBody>

            </Card>
        </div>
    )
}

export default Page