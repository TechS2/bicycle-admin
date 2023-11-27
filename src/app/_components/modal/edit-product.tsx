'use client'

import { FaPencil } from 'react-icons/fa6'
import { ProductForm } from "../form/product-form"
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { ProductEditForm } from '../form/product-edit'

export const EditProduct = ({product}:{product:ProductProp}) => {

    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button
                className="text-green-600 border-2 border-green-600 rounded-full p-2"
                onClick={onOpen}
            >
                <FaPencil />
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Product</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <ProductEditForm product={product}  />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

