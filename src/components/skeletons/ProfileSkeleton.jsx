import React from 'react';
import { Box, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import PostItemSkeleton from './PostItemSkeleton';

const ProfileSkeleton = () => {
   return (
      <Box h='calc(100vh - 120px)'>
         <Skeleton h={['7rem', '7rem', '9rem']} endColor='black' />

         <Box mx={{ base: 'none', md: '.5rem' }}>
            <Box maxW='1000px' mx='auto'>
               <Box
                  boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
                  bg='white'
                  mt='-3.5rem'
                  borderRadius='5px'
                  pos='relative'
                  p={{ base: '.5rem .5rem 2rem', md: '1rem 1rem 2rem' }}
                  textAlign={{ base: 'start', md: 'center' }}
               >
                  <SkeletonCircle
                     boxSize={{ base: '60px', md: '120px' }}
                     pos='absolute'
                     top={{ base: '-30px', md: '-60px' }}
                     left={{ base: '2.5rem', md: '50%' }}
                     transform='translateX(-50%)'
                  />

                  <Skeleton
                     h='20px'
                     mt={['2rem', '2rem', '4rem']}
                     maxW='220px'
                     mx={{ md: 'auto' }}
                  />

                  <Skeleton
                     h='15px'
                     mt='.5rem'
                     maxW='600px'
                     mx={{ md: 'auto' }}
                  />

                  <Skeleton
                     h='15px'
                     my='.5rem'
                     maxW='600px'
                     mx={{ md: 'auto' }}
                  />
               </Box>
               <PostItemSkeleton />
            </Box>
         </Box>
      </Box>
   );
};

export default ProfileSkeleton;