import {
   Box,
   Modal,
   ModalBody,
   ModalCloseButton,
   ModalContent,
   ModalHeader,
   ModalOverlay,
   useColorModeValue,
   useDisclosure,
} from '@chakra-ui/react';
import { VscClose } from 'react-icons/vsc';
import { useNavigate } from 'react-router-dom';
import { BtnDefault, BtnRed, SecondaryBtn } from '../utils/Buttons';

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
            <ModalContent
               bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
               className='shadow'
            >
               <ModalHeader
                  borderBottom='1px solid'
                  borderBottomColor={useColorModeValue(
                     'light.cardBorder',
                     'dark.cardBorder'
                  )}
                  p='1rem'
               >
                  You have unsaved changes
               </ModalHeader>
               <ModalCloseButton />
               <ModalBody mt='1rem' p='.5rem 1rem'>
                  You've made changes to your post. Do you want to navigate to
                  leave this page?
                  <Box mt={5} mb={3}>
                     <BtnRed mr={2} onClick={() => navigate(-1)}>
                        Leave the page
                     </BtnRed>

                     <BtnDefault onClick={onClose}>Keep editing</BtnDefault>
                  </Box>
               </ModalBody>
            </ModalContent>
         </Modal>
      </>
   );
};

export default LeavePageAlert;
