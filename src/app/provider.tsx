'use client'


import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CacheProvider>
                <ChakraProvider>
                    {children}
                </ChakraProvider>
            </CacheProvider>
        </SessionProvider>

    )
}