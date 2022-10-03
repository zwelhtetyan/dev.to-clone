import React, { useState } from 'react';
import {
   Box,
   Flex,
   HStack,
   Input,
   Menu,
   MenuButton,
   MenuList,
   Text,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react';
import {
   titleStyles,
   CustomizeProfileCard,
   Label,
} from '../../../utils/CustomizeProfileStyles';
import defaultProfile from '../../../assets/images/default_profile.webp';
import { FaRegEdit } from 'react-icons/fa';
import CustomMenuItem from '../../../utils/CustomMenuItem';
import { checkUsername } from '../../../helper/checkUsername';

const User = ({
   nameRef,
   emailRef,
   usernameRef,
   profileData,
   authenticatedUsernames,
   previewImgRef,
   removeProfileImgHandler,
}) => {
   const [previewImg, setPreviewImg] = useState('');
   const [isValid, setIsValid] = useState('valid');

   const imagePreviewHandler = (e) => {
      const image = e.target.files[0];

      const reader = new FileReader();

      reader.addEventListener(
         'load',
         () => {
            setPreviewImg(reader.result);
         },
         false
      );

      if (image) {
         reader.readAsDataURL(image);
      }
   };

   const clickEdit = () => {
      document.getElementById('edit').click();
   }; // if no profile image , i want user to go to file directly without showing option.

   const isValidUsername = (username) => {
      const status = checkUsername(username, authenticatedUsernames);
      setIsValid(status);
   };

   return (
      <CustomizeProfileCard>
         <Text {...titleStyles}>User</Text>

         <VStack spacing={3}>
            <Flex justify='center'>
               <Flex flexDirection='column' justifyContent='center'>
                  <Text textAlign='center' mb={3}>
                     Profile Image
                  </Text>

                  <Menu autoSelect={false}>
                     <MenuButton
                        type='button'
                        display='block'
                        onClick={!profileData?.profile ? clickEdit : null}
                     >
                        <Box
                           boxSize='100px'
                           borderRadius='full'
                           border='1px solid'
                           borderColor={useColorModeValue('#E2E8F0', '#2a2a2a')}
                           backgroundImage={
                              previewImg ||
                              profileData?.profile ||
                              defaultProfile
                           }
                           backgroundPosition='center'
                           backgroundRepeat='no-repeat'
                           backgroundSize='cover'
                           pos='relative'
                           title={previewImg}
                           ref={previewImgRef}
                        >
                           <HStack
                              pos='absolute'
                              background='#000000a3'
                              bottom='-2px'
                              color='light.cardBg'
                              px='.5rem'
                              borderRadius='5px'
                              fontSize='14px'
                              left='-6px'
                           >
                              <FaRegEdit /> <Text>Edit</Text>
                           </HStack>
                        </Box>
                     </MenuButton>

                     <MenuList
                        mx='auto !imporant'
                        minW='0 !important'
                        p='.5rem'
                        w='170px'
                        bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
                        opacity={
                           !profileData?.profile
                              ? '0 !important'
                              : '1 !important'
                        }
                     >
                        <CustomMenuItem py='0'>
                           <label
                              style={{ width: '100%', padding: '8px 0' }}
                              id='edit'
                           >
                              <Input
                                 type='file'
                                 display='none'
                                 onChange={imagePreviewHandler}
                              />{' '}
                              Upload a photo
                           </label>
                        </CustomMenuItem>

                        <CustomMenuItem
                           onClick={() =>
                              removeProfileImgHandler(profileData.profile)
                           }
                        >
                           Remove photo
                        </CustomMenuItem>
                     </MenuList>
                  </Menu>
               </Flex>
            </Flex>

            <Box w='100%'>
               <Label mb='.3rem'>Name</Label>
               <Input
                  defaultValue={profileData?.name}
                  placeholder='Zwel'
                  type='text'
                  required
                  ref={nameRef}
               />
            </Box>

            <Box w='100%'>
               <Label mb='.3rem'>Username</Label>
               <Input
                  defaultValue={profileData?.username}
                  placeholder='zwelhtetyan'
                  type='text'
                  required
                  ref={usernameRef}
                  onChange={({ target }) => isValidUsername(target.value)}
               />
               <Text color='red' fontSize='15'>
                  {isValid === 'valid' ? '' : isValid}
               </Text>
            </Box>

            <Box w='100%'>
               <Label mb='.3rem'>Email address</Label>
               <Input
                  defaultValue={profileData?.email}
                  placeholder='example@gmail.com'
                  type='email'
                  ref={emailRef}
               />
            </Box>
         </VStack>
      </CustomizeProfileCard>
   );
};

export default User;
