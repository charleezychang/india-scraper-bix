'use client'

import { Button, Card, CardBody, CardHeader, Text, Input, VStack, CardFooter } from '@chakra-ui/react'
import { ChangeEvent, useEffect, useState } from 'react'
import PrimaryButton from '@/src/components/PrimaryButton'
import Profile from '@/src/components/Profile'
import useFirebaseDatabase from '@/src/firebase/useFirebaseDatabase'
import FlashCard from '@/src/components/FlashCard'

function Page() {
    // const { user, loading, logOut } = useFirebaseAuth()
    const { initializeDeck } = useFirebaseDatabase()

    useEffect(() => {
        console.log('on deck')
        initializeDeck()
    }, [])


    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-h-screen'>
            <VStack>
                <div className='tw-self-start'>
                    <Profile />
                </div>
                <Card className='tw-bg-[#242424] tw-w-[350px] tw-rounded-b-xl tw-rounded-tr-xl tw-p-4 tw-items-center tw--translate-y-8'>
                    {/* <CardHeader display="flex" alignItems="center" flexDirection='column'>
                        <Text className='tw-text-white tw-text-2xl'>Deck</Text>
                    </CardHeader> */}
                    <CardBody>
                        <FlashCard />
                        {/* <Input placeholder="Input url of a section's last page" onChange={handleUrlToScrapeChange} /> */}
                        {/* <PrimaryButton displayText='Logout' onClick={logOut} /> */}
                        {/* <PrimaryButton displayText='Import' onClick={handleImportCards} /> */}
                    </CardBody>
                    <CardFooter>
                        <PrimaryButton displayText='Next →' onClick={() => { }} />
                    </CardFooter>
                </Card>
            </VStack>
        </div>
    )
}

export default Page