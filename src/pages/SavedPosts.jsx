import { Box, HStack } from '@chakra-ui/react';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Header from '../components/savedPosts/Header';
import Left from '../components/savedPosts/Left';
import Right from '../components/savedPosts/Right';
import { useAuth } from '../context/auth';
import ErrorMessage from '../utils/ErrorMessage';

const SavedPosts = () => {
   const user = useAuth();
   const { userId } = user;

   const [savedPosts, setSavedPosts] = useState([]);
   const [allTopics, setAllTopics] = useState([]);
   const [selectedTopic, setSelectedTopic] = useState('All tags');
   const [searchTerm, setSearchTerm] = useState('');

   //scroll top
   useEffect(() => window.scrollTo(0, 0), [selectedTopic]);

   const { transformedData, transformedDataErr: err } = useSelector(
      (state) => state.transformedData
   );

   useEffect(() => {
      if (transformedData) {
         const savedPosts = transformedData.filter((postItem) =>
            postItem.saved?.includes(userId)
         );

         const allTopics = [{ topic: 'All tags', active: true }];
         savedPosts.forEach((postData) => {
            if (postData.tags.length !== 0) {
               allTopics.push(...postData.tags);
            }
         });

         setSavedPosts(savedPosts);
         setAllTopics(allTopics);
      }
   }, [transformedData, userId]);

   if (!user) {
      return <Navigate to='/create-account' />;
   }

   if (err) {
      return <ErrorMessage offline={true} />;
   }

   const handleClickTopic = (topic) => {
      const transformedTopics = allTopics.map((item) =>
         item.topic === topic
            ? { ...item, active: true }
            : { ...item, active: false }
      );

      setSelectedTopic(topic);
      setAllTopics(transformedTopics);
   };

   const handleSearch = ({ target }) => {
      setTimeout(() => setSearchTerm(target.value), 300);
   };

   return (
      <Box flex='1' maxW='1280px' w='100%' p={['.5rem', '1rem']}>
         <Header
            readingCount={savedPosts.length}
            allTopics={allTopics}
            handleClickTopic={handleClickTopic}
            selectedTopic={selectedTopic}
            handleSearch={handleSearch}
         />

         <HStack mt='1rem' align='flex-start'>
            <Left allTopics={allTopics} handleClickTopic={handleClickTopic} />

            <Right
               savedPosts={savedPosts}
               selectedTopic={selectedTopic}
               searchTerm={searchTerm}
            />
         </HStack>
      </Box>
   );
};

export default SavedPosts;
