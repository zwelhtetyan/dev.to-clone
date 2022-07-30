import {
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalFooter,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react';
import { VscClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { SecondaryBtn } from '../utils/Buttons';

const ModalAlert = () => {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const navigate = useNavigate();

   return (
      <>
         <SecondaryBtn onClick={onOpen}>
            <VscClose size={23} />
         </SecondaryBtn>
         <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset='none'
            closeOnOverlayClick={false}
            size='2xl'
         >
            <ModalOverlay />
            <ModalContent w='95%'>
               <ModalHeader>You have unsaved changes</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  You've made changes to your post. Do you want to navigate to
                  leave this page?
               </ModalBody>

               <ModalFooter>
                  <Button
                     colorScheme='red'
                     mr={3}
                     onClick={() => navigate('/')}
                  >
                     Leave the page
                  </Button>
                  <Button onClick={onClose}>Keep editing</Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </>
   );
};

export default ModalAlert;
