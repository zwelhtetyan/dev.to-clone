import React from 'react';
import { Box, Button, Flex, Heading, HStack } from '@chakra-ui/react';
import TagCard from './TagCard';
import { nanoid } from '@reduxjs/toolkit';
import SearchInput from '../../components/search/SearchInput';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import useGetQuerySearchTerm from '../../hooks/useGetQuerySearchTerm';
import { useSelector } from 'react-redux';
import ErrorMessage from '../../utils/ErrorMessage';
import { useEffect } from 'react';
import { isPrebuiltTag } from '../../helper/isPrebuiltTag';
import TagCardSkeleton from '../../components/skeletons/TagCardSkeleton';

const Tags = () => {
   // scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const navigate = useNavigate();
   const searchInputRef = useRef();

   const querySearchTerm = useGetQuerySearchTerm('stq') || '';

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   const { profileData, profileDataLoading } = useSelector(
      (state) => state.profileData
   );

   if (err) {
      return <ErrorMessage offline={true} />;
   }

   let allTags = [];
   if (transformedData) {
      const avaliableTags = [];

      transformedData.forEach(
         (postData) =>
            !postData.draft &&
            postData.tags.length &&
            avaliableTags.push(...postData.tags)
      );

      allTags = avaliableTags.map(
         (tag) =>
            isPrebuiltTag(tag.tagName) || {
               brandColor: '#3B49DF',
               tagName: tag.tagName,
            }
      );

      allTags = allTags.map((tag, idx, arr) => {
         const count = arr.filter(
            (item) => item.tagName === tag.tagName
         ).length;

         return { ...tag, publishedPosts: count };
      });

      // remove duplicate obj from an array
      const getUniqueListBy = (arr, key) => {
         return [...new Map(arr.map((item) => [item[key], item])).values()];
      };

      allTags = getUniqueListBy(allTags, 'tagName').sort(
         (a, b) => b.publishedPosts - a.publishedPosts
      );
   }

   const filteredTags = allTags
      .filter((tag) => tag.tagName.includes(querySearchTerm))
      .splice(0, 30); // limit top tags to 30;

   return (
      <Box flex='1' w='100%' maxW='1280px' px={{ base: '.5rem', md: '1rem' }}>
         <Flex
            justify='space-between'
            flexDirection={{ base: 'column', md: 'row' }}
            mb={5}
         >
            <Heading
               fontSize={{ base: '1.5rem', md: '2rem' }}
               mb={{ base: '.5rem', md: 0 }}
            >
               Top Tags
            </Heading>

            <HStack>
               <SearchInput
                  ref={searchInputRef}
                  querySearchTerm={querySearchTerm}
                  px='0'
                  placeholder='Search for tag'
                  route='tags'
                  flex='1'
               />

               <Button
                  fontWeight='400'
                  onClick={() => navigate('/dashboard/following_tags')}
               >
                  Following tags
               </Button>
            </HStack>
         </Flex>

         {!loading && filteredTags.length === 0 ? (
            <Box
               p='3rem .5rem'
               textAlign='center'
               w='100%'
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               bg='white'
               borderRadius='5px'
            >
               No results match that query
            </Box>
         ) : (
            <Box
               display='grid'
               gap={{ base: '.5rem', md: '1rem' }}
               gridTemplateColumns={{
                  md: 'repeat(2, minmax(0, 1fr))',
                  xl: 'repeat(3, minmax(0, 1fr))',
               }}
            >
               {loading && (
                  <>
                     <TagCardSkeleton />
                     <TagCardSkeleton />
                     <TagCardSkeleton />
                     <TagCardSkeleton />
                     <TagCardSkeleton />
                     <TagCardSkeleton />
                  </>
               )}

               {filteredTags.map((tag) => (
                  <TagCard
                     {...tag}
                     key={nanoid()}
                     profileData={profileData}
                     profileDataLoading={profileDataLoading}
                  />
               ))}
            </Box>
         )}
      </Box>
   );
};

export default Tags;
