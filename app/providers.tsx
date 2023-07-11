'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import { ChakraProvider } from '@chakra-ui/react'
import { extendTheme } from '@chakra-ui/react'

const colors = {
    brand: {
        primary: '#454545',
        secondary: '#242424',
        text: '#f0f0f0',
        accent: '#90ee86',
    },
}

export const theme = extendTheme({ colors })

export function Providers({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <div>
            <CacheProvider>
                <ChakraProvider theme={theme} cssVarsRoot="body">
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </div>
    )
}