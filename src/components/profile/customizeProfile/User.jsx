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
   VStack,
} from '@chakra-ui/react';
import {
   InputborderColor,
   labelStyles,
   titleStyles,
   whiteBoxStyles,
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
      <Box {...whiteBoxStyles}>
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
                              color='white'
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
               <label style={labelStyles}>Name</label>
               <Input
                  defaultValue={profileData?.name}
                  placeholder='Zwel'
                  type='text'
                  required
                  {...InputborderColor}
                  ref={nameRef}
               />
            </Box>

            <Box w='100%'>
               <label style={labelStyles}>Username</label>
               <Input
                  defaultValue={profileData?.username}
                  placeholder='zwelhtetyan'
                  type='text'
                  required
                  {...InputborderColor}
                  ref={usernameRef}
                  onChange={({ target }) => isValidUsername(target.value)}
               />
               <Text color='red' fontSize='15'>
                  {isValid === 'valid' ? '' : isValid}
               </Text>
            </Box>

            <Box w='100%'>
               <label style={labelStyles}>Email address</label>
               <Input
                  defaultValue={profileData?.email}
                  placeholder='example@gmail.com'
                  type='email'
                  {...InputborderColor}
                  ref={emailRef}
               />
            </Box>
         </VStack>
      </Box>
   );
};

export default User;
