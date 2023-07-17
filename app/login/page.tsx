'use client'

import React from 'react'
import { Card, CardHeader, CardBody, CardFooter, Text, InputGroup, InputLeftElement } from '@chakra-ui/react'
import LoginWithGoogle from '@/src/firebase/loginWithGoogle';
import { Input } from '@chakra-ui/react'
import { HStack, VStack } from '@chakra-ui/react'
import { Divider } from '@chakra-ui/react'
import PrimaryButton from '@/src/components/PrimaryButton';
import Image from 'next/image';
import Person from '../../src/assets/icons/Person.svg'
import Lock from '../../src/assets/icons/Lock.svg'

function Page() {

    return (
        <div className='tw-flex tw-items-center tw-justify-center tw-h-screen'>
            <Card className='tw-bg-[#242424] tw-w-[350px] tw-rounded-xl tw-p-4 tw-items-center'>
                <CardHeader display="flex" alignItems="center" flexDirection='column'>
                    <Text className='tw-text-white tw-text-2xl'>Indiabix Scraper</Text>
                    <Text className='tw-text-white tw-text-xl'>with spaced repetition</Text>
                </CardHeader>
                <CardBody className='tw-pb-10'>
                    <LoginWithGoogle />
                </CardBody>
                <Divider borderColor={'brand.text'} className='tw-mx-4' />
                <Text className='tw--translate-y-[14px] tw-px-4 tw-bg-[#242424]' color='brand.text'>or</Text>
                <CardBody className='tw-pt-4'>
                    <VStack spacing='24px'>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' p={2}>
                                <Image src={Person} alt='person-icon' />
                            </InputLeftElement>
                            <Input placeholder='email address' color='brand.text' focusBorderColor='brand.accent' />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftElement pointerEvents='none' p={2}>
                                <Image src={Lock} alt='lock-icon' />
                            </InputLeftElement>
                            <Input type='password' placeholder='password' color='brand.text' focusBorderColor='brand.accent' />
                        </InputGroup>
                    </VStack>
                </CardBody>
                <CardFooter className='tw--translate-y-[14px]'>
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