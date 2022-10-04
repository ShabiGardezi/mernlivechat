import { Text,IconButton , Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,useDisclosure,Button} from '@chakra-ui/react'
import {AttachmentIcon} from "@chakra-ui/icons"
import React from 'react'

function ImageModal() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
      <>
        {/* <Button onClick={onOpen}>Trigger modal</Button> */}
        <IconButton onClick={onOpen} borderRadius={"full"} aria-label='Attachment icon' icon={<AttachmentIcon />} />
  
        <Modal onClose={onClose} isOpen={isOpen} isCentered>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody  textAlign={"center"}>
            <Text  fontWeight={"bold"} fontSize="2rem" >This feature is still in development phase</Text>
          
            </ModalBody>
            <ModalFooter>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    )
}

export default ImageModal