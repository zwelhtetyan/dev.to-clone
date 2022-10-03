import React, { useEffect } from 'react';
import {
   Box,
   Button,
   Flex,
   Heading,
   HStack,
   useColorModeValue,
} from '@chakra-ui/react';
import TagCard from './TagCard';
import { nanoid } from '@reduxjs/toolkit';
import SearchInput from '../../components/search/SearchInput';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import useGetQuerySearchTerm from '../../hooks/useGetQuerySearchTerm';
import { useDispatch, useSelector } from 'react-redux';
import ErrorMessage from '../../utils/ErrorMessage';
import TagCardSkeleton from '../../components/skeletons/TagCardSkeleton';
import { getPopularTags } from '../../helper/getPopularTags';
import { useAuth } from '../../context/auth';
import { setLoginAlert } from '../../store/loginAlert';

const Tags = () => {
   // scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const user = useAuth();
   const searchInputRef = useRef();

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const querySearchTerm = useGetQuerySearchTerm('stq') || '';

   const {
      transformedData,
      transformedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   const { profileData, profileDataLoading } = useSelector(
      (state) => state.profileData
   );

   const cardBg = useColorModeValue('light.cardBG', 'dark.cardBg');

   if (err) {
      return <ErrorMessage offline={true} />;
   }

   const popularTags = getPopularTags(transformedData);

   const filteredTags = popularTags
      .filter((tag) => tag.tagName.includes(querySearchTerm))
      .splice(0, 30); // limit top tags to 30;

   const handleClickFollowingTags = () => {
      if (!user) {
         dispatch(setLoginAlert(true));
         return;
      }

      navigate('/dashboard/following_tags');
   };

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

               <Button fontWeight='400' onClick={handleClickFollowingTags}>
                  Following tags
               </Button>
            </HStack>
         </Flex>

         {!loading && filteredTags.length === 0 ? (
            <Box
               p='3rem .5rem'
               textAlign='center'
               w='100%'
               className='shadow'
               bg={cardBg}
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
