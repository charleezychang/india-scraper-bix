'use client'

import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text, Button, AbsoluteCenter, Box, InputGroup, InputLeftElement } from '@chakra-ui/react'
import LoginWithGoogle from '@/src/firebase/loginWithGoogle';
import initFirebase from '@/src/firebase/config';
import { Input } from '@chakra-ui/react'
import { Stack, HStack, VStack } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import PrimaryButton from '@/src/components/PrimaryButton';
import Image from 'next/image';
import Person from '../../src/assets/icons/Person.svg'
import Lock from '../../src/assets/icons/Lock.svg'

function Page() {
    initFirebase()

    return (
        <div className='flex items-center justify-center h-screen'>
            <Card className='bg-[#242424] w-[350px] rounded-xl p-4 items-center'>
                <CardHeader display="flex" alignItems="center" flexDirection='column'>
                    <Text className='text-white text-2xl'>Indiabix Scraper</Text>
                    <Text className='text-white text-xl'>with spaced repetition</Text>
                </CardHeader>
                <CardBody className='pb-10'>
                    <LoginWithGoogle />
                </CardBody>
                <Divider borderColor={'brand.text'} className='mx-4' />
                <Text className='-translate-y-[14px] px-4 bg-[#242424]' color='brand.text'>or</Text>
                <CardBody className='pt-4'>
                    <VStack spacing='24px'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' p={2}>
                                <Image src={Person} alt='person-icon' />
                            </InputLeftElement>
                            <Input placeholder='email address' color='brand.text' />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' p={2}>
                                <Image src={Lock} alt='lock-icon' />
                            </InputLeftElement>
                            <Input type='password' placeholder='password' color='brand.text' />
                        </InputGroup>
                    </VStack>
                </CardBody>
                <CardFooter className='-translate-y-[14px]'>
                    <HStack spacing='16px'>
                        <PrimaryButton displayText='Login' onClick={() => { }} width='100px' />
                        <PrimaryButton displayText='Register' onClick={() => { }} width='100px' />
                    </HStack>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Page