import {
   Box,
   HStack,
   Skeleton,
   SkeletonCircle,
   SkeletonText,
} from '@chakra-ui/react';
import React from 'react';
import useSkeletonColor from '../../hooks/useSkeletonColor';

const PostItemSkeleton = ({ firstItem }) => {
   const skeletonColor = useSkeletonColor();

   return (
      <Box
         bg='transparent'
         px={['.5rem', '1.5rem']}
         py={['.7rem', '1.5rem']}
         borderRadius={{ base: '0', md: '5px' }}
         mb='.5rem'
         mx='auto'
         className='shadow'
      >
         {firstItem && (
            <Box h={{ base: '200px', md: '230px' }} mb='.5rem'></Box>
         )}

         <HStack>
            <SkeletonCircle size='10' {...skeletonColor} />
            <SkeletonText
               mt={3}
               noOfLines={2}
               spacing='2'
               w='30%'
               {...skeletonColor}
            />
         </HStack>

         <Box ms={{ base: '0', md: '48px' }}>
            <Skeleton h='15px' mt={2} {...skeletonColor} />

            <Skeleton h='15px' w='50%' mt={2} {...skeletonColor} />

            <HStack justify='space-between' mt={2}>
               <HStack>
                  <HStack>
                     <Skeleton
                        w={['50px', '90px']}
                        h='15px'
                        {...skeletonColor}
                     />
                  </HStack>
                  <HStack>
                     <Skeleton
                        w={['50px', '90px']}
                        h='15px'
                        {...skeletonColor}
                     />
                  </HStack>
               </HStack>

               <HStack>
                  <SkeletonText noOfLines={1} w='70px' {...skeletonColor} />
                  <Skeleton w='20px' h='20px' {...skeletonColor} />
               </HStack>
            </HStack>
         </Box>
      </Box>
   );
};

export default PostItemSkeleton;
