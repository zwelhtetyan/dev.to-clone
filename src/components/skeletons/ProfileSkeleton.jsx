import React from 'react';
import {
   Box,
   Skeleton,
   SkeletonCircle,
   useColorModeValue,
} from '@chakra-ui/react';
import useSkeletonColor from '../../hooks/useSkeletonColor';

const ProfileSkeleton = () => {
   const skeletonColor = useSkeletonColor();

   return (
      <Box flex='1' w='100%'>
         <Skeleton {...skeletonColor} h={['7rem', '7rem', '9rem']} />

         <Box mx={{ base: 'none', md: '.5rem' }}>
            <Box maxW='1000px' mx='auto'>
               <Box
                  bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
                  mt='-3.5rem'
                  borderRadius={{ md: '5px' }}
                  pos='relative'
                  p={{ base: '.5rem .5rem 2rem', md: '1rem 1rem 2rem' }}
                  textAlign={{ base: 'start', md: 'center' }}
               >
                  <SkeletonCircle
                     {...skeletonColor}
                     boxSize={{ base: '60px', md: '120px' }}
                     pos='absolute'
                     top={{ base: '-30px', md: '-60px' }}
                     left={{ base: '2.5rem', md: '50%' }}
                     transform='translateX(-50%)'
                  />

                  <Skeleton
                     {...skeletonColor}
                     h='20px'
                     mt={['2rem', '2rem', '4rem']}
                     maxW='220px'
                     mx={{ md: 'auto' }}
                  />

                  <Skeleton
                     {...skeletonColor}
                     h='15px'
                     mt='.5rem'
                     maxW='600px'
                     mx={{ md: 'auto' }}
                  />

                  <Skeleton
                     {...skeletonColor}
                     h='15px'
                     my='.5rem'
                     maxW='600px'
                     mx={{ md: 'auto' }}
                  />
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default ProfileSkeleton;
