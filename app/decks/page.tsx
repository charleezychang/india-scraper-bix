'use client'

import useFirebaseAuth from '@/src/firebase/useFirebaseAuth'
import useImportCards from '@/src/hooks/useImportCards'
import { Button, Card, CardBody, CardHeader, Text, Input, VStack } from '@chakra-ui/react'
import { ChangeEvent, useState } from 'react'
import PrimaryButton from '@/src/components/PrimaryButton'
import Profile from '@/src/components/Profile'

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
        <div className='tw-flex tw-items-center tw-justify-center tw-h-screen tw--translate-y-40'>
            <VStack>
                <div className='tw-self-start'>
                    <Profile />
                </div>
                <Card className='tw-bg-[#242424] tw-w-[350px] tw-rounded-b-xl tw-rounded-tl-xl tw-p-4 tw-items-center tw--translate-y-6'>
                    <CardHeader display="flex" alignItems="center" flexDirection='column'>
                        <Text className='tw-text-white tw-text-2xl'>Deck</Text>
                    </CardHeader>
                    <CardBody>
                        <Input placeholder="Input url of a section's last page" onChange={handleUrlToScrapeChange} />
                        <PrimaryButton displayText='Logout' onClick={logOut} />
                        <PrimaryButton displayText='Import' onClick={handleImportCards} />
                    </CardBody>
                </Card>
            </VStack>
        </div>
    )
}

export default Page