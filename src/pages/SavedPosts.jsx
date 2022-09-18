import React from 'react';
import { Box, HStack } from '@chakra-ui/react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/savedPosts/Header';
import Left from '../components/savedPosts/Left';
import Right from '../components/savedPosts/Right';
import { useAuth } from '../context/auth';
import ErrorMessage from '../utils/ErrorMessage';
import Error from './Error';

const SavedPosts = () => {
   const user = useAuth();
   const userId = user?.userId;
   const navigate = useNavigate();
   const location = useLocation();

   // const [savedPosts, setSavedPosts] = useState([]);
   // const [archivedPosts, setArchivedPosts] = useState([]);
   const [allTopics, setAllTopics] = useState([]);
   const [selectedTopic, setSelectedTopic] = useState('All tags');
   const [searchTerm, setSearchTerm] = useState('');

   //scroll top
   useEffect(() => window.scrollTo(0, 0), [selectedTopic]);

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   const queryParam = new URLSearchParams(location.search);
   const query = queryParam.get('');

   /*option 1 */
   let savedPosts = [];
   let archivedPosts = [];

   if (transformedData) {
      savedPosts = transformedData.filter(
         (postItem) =>
            postItem.saved?.includes(userId) &&
            !postItem.archived?.includes(userId)
      );

      archivedPosts = transformedData.filter((postItem) =>
         postItem.archived?.includes(userId)
      );
   }

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

         const currentPosts = query ? archivedPosts : savedPosts;

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

         setAllTopics(transformedTopics);
         setSelectedTopic('All tags');
      }
   }, [transformedData, query, userId]);

   /* option 2 (using state) 
      => setting data inside useEffect takes a while to get data
      => if i create state and set the state inside useEffect , although loading is false but need to wait stateChange and compnent rerender finished
   */

   // useEffect(() => {
   //    if (transformedData) {
   //       const savedPosts = transformedData.filter(
   //          (postItem) =>
   //             postItem.saved?.includes(userId) &&
   //             !postItem.archived?.includes(userId)
   //       );

   //       const archivedPosts = transformedData.filter((postItem) =>
   //          postItem.archived?.includes(userId)
   //       );

   //       const currentPosts = query ? archivedPosts : savedPosts;

   //       const allTopics = [{ topic: 'All tags', active: true }];
   //       currentPosts.forEach((postData) => {
   //          if (postData.tags.length !== 0) {
   //             allTopics.push(...postData.tags);
   //          }
   //       });

   //       const transform = new Set(allTopics.map((item) => item.topic));
   //       const transformedTopics = [...transform].map((topic) =>
   //          topic === 'All tags' ? { topic, active: true } : { topic }
   //       );

   //       setSavedPosts(savedPosts);
   //       setArchivedPosts(archivedPosts);
   //       setAllTopics(transformedTopics);
   //       setSelectedTopic('All tags');
   //    }
   // }, [query, transformedData, userId]);

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

   if (query !== 'archive' && query !== null) {
      return <Error />;
   }

   const toggleViewArchive = () => {
      if (query) {
         navigate('/readinglist');
      } else {
         navigate('/readinglist?=archive');
      }
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
            toggleViewArchive={toggleViewArchive}
         />

         <HStack mt='1rem' align='flex-start'>
            <Left allTopics={allTopics} handleClickTopic={handleClickTopic} />

            <Right
               savedPosts={savedPosts}
               archivedPosts={archivedPosts}
               selectedTopic={selectedTopic}
               searchTerm={searchTerm}
               loading={loading}
            />
         </HStack>
      </Box>
   );
};

export default SavedPosts;
