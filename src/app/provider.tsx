'use client'


import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { NextUIProvider } from "@nextui-org/react";

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CacheProvider>
                <ChakraProvider>
                    <NextUIProvider>
                        {children}
                    </NextUIProvider>
                </ChakraProvider>
            </CacheProvider>
        </SessionProvider>

    )
}