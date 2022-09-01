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
   const userId = user?.userId;

   const [savedPosts, setSavedPosts] = useState([]);
   const [archivedPosts, setArchivedPosts] = useState([]);
   const [allTopics, setAllTopics] = useState([]);
   const [selectedTopic, setSelectedTopic] = useState('All tags');
   const [searchTerm, setSearchTerm] = useState('');
   const [viewArchive, setViewArchive] = useState(false);

   //scroll top
   useEffect(() => window.scrollTo(0, 0), [selectedTopic]);

   const {
      transformedData,
      setTransformedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   useEffect(() => {
      if (transformedData) {
         const savedPosts = transformedData.filter(
            (postItem) =>
               postItem.saved?.includes(userId) &&
               !postItem.archived?.includes(userId)
         );

         const archivedPosts = transformedData.filter((postItem) =>
            postItem.archived?.includes(userId)
         );

         const currentPosts = viewArchive ? archivedPosts : savedPosts;

         const allTopics = [{ topic: 'All tags', active: true }];
         currentPosts.forEach((postData) => {
            if (postData.tags.length !== 0) {
               allTopics.push(...postData.tags);
            }
         });

         const transform = new Set(allTopics.map((item) => item.topic));
         const transformedTopics = [...transform].map((topic) =>
            topic === 'All tags' ? { topic, active: true } : { topic }
         );

         setSavedPosts(savedPosts);
         setArchivedPosts(archivedPosts);
         setAllTopics(transformedTopics);
         setSelectedTopic('All tags');
      }
   }, [transformedData, userId, viewArchive]);

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
      setSearchTerm(target.value);
   };

   const toggleViewArchive = () => {
      setViewArchive((prev) => !prev);
   };

   return (
      <Box flex='1' maxW='1280px' w='100%' p={{ md: '.5rem', xl: '1rem' }}>
         <Header
            readingCount={savedPosts.length}
            archiveCount={archivedPosts.length}
            allTopics={allTopics}
            handleClickTopic={handleClickTopic}
            selectedTopic={selectedTopic}
            handleSearch={handleSearch}
            viewArchive={viewArchive}
            toggleViewArchive={toggleViewArchive}
         />

         <HStack mt='1rem' align='flex-start'>
            <Left allTopics={allTopics} handleClickTopic={handleClickTopic} />

            <Right
               savedPosts={savedPosts}
               archivedPosts={archivedPosts}
               selectedTopic={selectedTopic}
               searchTerm={searchTerm}
               viewArchive={viewArchive}
               loading={loading}
            />
         </HStack>
      </Box>
   );
};

export default SavedPosts;
