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
   const [allTags, setAllTags] = useState([]);
   const [selectedTagName, setSelectedTagName] = useState('All tags');
   const [searchTerm, setSearchTerm] = useState('');

   //scroll top
   useEffect(() => window.scrollTo(0, 0), [selectedTagName]);

   const {
      transformedData,
      transformedDataLoading: loading,
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

         const allTags = [{ tagName: 'All tags', active: true }];
         currentPosts.forEach((postData) => {
            if (postData.tags.length !== 0) {
               allTags.push(...postData.tags);
            }
         });

         const transform = new Set(allTags.map((item) => item.tagName));
         const transformedTags = [...transform].map((tagName) =>
            tagName === 'All tags' ? { tagName, active: true } : { tagName }
         );

         setAllTags(transformedTags);
         setSelectedTagName('All tags');
      }
   }, [transformedData, query, userId]);

   /* option 2 (using state) 
      => setting data inside useEffect takes a while to get data
      => if i create state and set the state inside useEffect , although loading is false but need to wait stateChange and compnent rerender time to finish
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

   //       const allTags = [{ tagName: 'All tags', active: true }];
   //       currentPosts.forEach((postData) => {
   //          if (postData.tags.length !== 0) {
   //             allTags.push(...postData.tags);
   //          }
   //       });

   //       const transform = new Set(allTags.map((item) => item.tagName));
   //       const transformedTags = [...transform].map((tagName) =>
   //          tagName === 'All tags' ? { tagName, active: true } : { tagName }
   //       );

   //       setSavedPosts(savedPosts);
   //       setArchivedPosts(archivedPosts);
   //       setAllTags(transformedTags);
   //       setSelectedTagName('All tags');
   //    }
   // }, [query, transformedData, userId]);

   if (!user) {
      return <Navigate to='/create-account' replace />;
   }

   if (err) {
      return <ErrorMessage offline={true} />;
   }

   const handleClickTag = (tagName) => {
      const transformedTags = allTags.map((item) =>
         item.tagName === tagName
            ? { ...item, active: true }
            : { ...item, active: false }
      );

      setSelectedTagName(tagName);
      setAllTags(transformedTags);
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
            allTags={allTags}
            handleClickTag={handleClickTag}
            selectedTagName={selectedTagName}
            handleSearch={handleSearch}
            toggleViewArchive={toggleViewArchive}
         />

         <HStack mt='1rem' align='flex-start'>
            <Left allTags={allTags} handleClickTag={handleClickTag} />

            <Right
               savedPosts={savedPosts}
               archivedPosts={archivedPosts}
               selectedTagName={selectedTagName}
               searchTerm={searchTerm}
               loading={loading}
            />
         </HStack>
      </Box>
   );
};

export default SavedPosts;
