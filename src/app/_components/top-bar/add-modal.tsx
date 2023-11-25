'use client'

import {  FaPlus } from 'react-icons/fa6'
import { ProductForm } from "../form/product-form"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"

export const AddModal = () => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button className="bg-green-600 text-white border-2 border-green-600 rounded-md hover:text-green-600 hover:bg-white" onClick={onOpen} leftIcon={<FaPlus />}>
                Add
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ProductForm />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

