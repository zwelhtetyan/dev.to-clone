import React, { useEffect, useState } from 'react';
import logo from '../assets/logo/logo.png';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import MDE from '../components/MDE';
import AddLangTag from '../components/LangTag/AddLangTag';
import { useSelector } from 'react-redux';
import AddCvImg from '../components/AddCvImg';
import {
   Box,
   HStack,
   Image,
   Input,
   Spinner,
   Text,
   VStack,
} from '@chakra-ui/react';
import {
   removeFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';
import ModalAlert from '../components/Modla';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {
   //scroll top
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   const navigate = useNavigate();

   //redux store
   const postToPublish = useSelector((state) => state.postToPublish);

   //states
   const [postData, setPostData] = useState(
      () =>
         JSON.parse(localStorage.getItem('postData')) || {
            cvImg: null,
            title: '',
            filteredTags: [],
            MDEValue: '',
         }
   );
   const [title, setTitle] = useState(postData.title || '');
   const [publishing, setPublishing] = useState(false);

   useEffect(() => {
      const newData = {
         cvImg: postToPublish.cvImg,
         title: title,
         filteredTags: postToPublish.filteredTags,
         MDEValue: postToPublish.MDEValue,
      };

      setPostData(newData);
      saveToLocalStorage('postData', JSON.stringify(newData));
   }, [postToPublish, title]);

   const publishPostHandler = async (e) => {
      e.preventDefault();

      setPublishing(true);
      await addDoc(collection(db, 'posts'), {
         ...postData,
         MDEValue: postData.MDEValue.preview,
         cvImg: postData.cvImg.url,
         createdAt: serverTimestamp(),
      });
      navigate('/');
      setPublishing(false);
      removeFromLocalStorage('postData');

      console.log('post uploaded successfully!', postData);
   };

   return (
      <Box maxW='768px' m='auto'>
         <Box display='flex'>
            <Box display='flex' alignItems='center' mr='auto'>
               <Image src={logo} alt='logo' w='58px' h='40px' />
               <Text fontSize='xl' ms='1'>
                  Create Post
               </Text>
            </Box>
            <ModalAlert />
         </Box>

         <VStack
            onSubmit={publishPostHandler}
            as='form'
            align='start'
            bg='white'
            border='2px solid #e2e8f0'
            borderRadius='5px'
            mt='1rem'
            p={{ base: '1.5rem 0.5rem', md: '2rem' }}
         >
            <AddCvImg cvImgFromLocalStorage={postData.cvImg} />

            <Input
               variant='unstyled'
               placeholder='New post title here...'
               fontSize='1.7rem'
               fontWeight='700'
               value={title}
               required
               onChange={({ target }) => setTitle(target.value)}
               _placeholder={{ color: '#525252' }}
            />

            <AddLangTag filteredTagsFromLocalStorage={postData.filteredTags} />

            <MDE MDEValue={postData.MDEValue} isPublishing={publishing} />

            <HStack justify='flex-end' w='100%'>
               <SecondaryBtn>Save Draft</SecondaryBtn>
               <PrimaryBtn type='submit'>
                  {publishing ? (
                     <>
                        <Spinner size='sm' mr='1' /> Publishing
                     </>
                  ) : (
                     'Publish'
                  )}
               </PrimaryBtn>
            </HStack>
         </VStack>
      </Box>
   );
};

export default CreatePost;
