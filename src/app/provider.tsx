'use client'


import { SessionProvider } from 'next-auth/react'
import { ChakraProvider } from '@chakra-ui/react'
import { CacheProvider } from '@chakra-ui/next-js'
import { NextUIProvider } from "@nextui-org/react";
import { PrimeReactProvider } from 'primereact/api';

export function Provider({ children }: { children: React.ReactNode }) {
    return (
        <SessionProvider>
            <CacheProvider>
                <ChakraProvider>
                    <NextUIProvider>
                        <PrimeReactProvider>
                        {children}
                        </PrimeReactProvider>
                    </NextUIProvider>
                </ChakraProvider>
            </CacheProvider>
        </SessionProvider>

    )
}