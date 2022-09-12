import {
   Box,
   Button,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useDisclosure,
} from '@chakra-ui/react';
import { VscClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { SecondaryBtn } from '../utils/Buttons';

const LeavePageAlert = () => {
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
            size={{ base: 'full', md: '2xl' }}
         >
            <ModalOverlay />
            <ModalContent>
               <ModalHeader
                  borderBottom='1px solid rgb(23 23 23 / 10%)'
                  p='1rem'
               >
                  You have unsaved changes
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody mt='1rem' p='.5rem 1rem'>
                  You've made changes to your post. Do you want to navigate to
                  leave this page?
                  <Box mt={5} mb={3}>
                     <Button
                        colorScheme='red'
                        mr={3}
                        onClick={() => navigate(-1)}
                     >
                        Leave the page
                     </Button>
                     <Button onClick={onClose}>Keep editing</Button>
                  </Box>
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
};

export default LeavePageAlert;
