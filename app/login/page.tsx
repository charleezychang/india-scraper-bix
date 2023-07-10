'use client'

import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text, Button } from '@chakra-ui/react'
import LoginWithGoogle from '@/src/firebase/loginWithGoogle';
import initFirebase from '@/src/firebase/config';

function Page() {
    initFirebase()

    return (
        <div className='flex items-center justify-center h-screen'>
            <Card className='bg-[#242424] w-[300px] h-[220px] rounded-md p-4 items-center'>
                <CardHeader display="flex" alignItems="center" flexDirection='column'>
                    <Text className='text-white text-2xl'>Indiabix Scrapper</Text>
                    <Text className='text-white text-xl'>with spaced repetition</Text>
                </CardHeader>
                <CardBody>
                    <LoginWithGoogle />
                </CardBody>

            </Card>
        </div>
    )
}

export default Page