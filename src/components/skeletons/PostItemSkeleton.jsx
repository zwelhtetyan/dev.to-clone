import {
   Box,
   HStack,
   Skeleton,
   SkeletonCircle,
   SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

const PostItemSkeleton = () => {
   return (
      <Box
         bg='transparent'
         px={['.5rem', '1.5rem']}
         py={['.7rem', '1.5rem']}
         borderRadius={{ base: '0', md: '5px' }}
         mb='.5rem'
         mx='auto'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
      >
         <HStack>
            <SkeletonCircle size='10' />
            <SkeletonText mt={3} noOfLines={2} spacing='2' w='30%' />
         </HStack>

         <Box ms={{ base: '0', md: '48px' }}>
            <Skeleton h='15px' mt={2} />

            <HStack justify='space-between' mt={2}>
               <HStack>
                  <HStack>
                     <Skeleton noOfLines={1} w={['50px', '90px']} h='15px' />
                  </HStack>
                  <HStack>
                     <Skeleton noOfLines={1} w={['50px', '90px']} h='15px' />
                  </HStack>
               </HStack>

               <SkeletonText noOfLines={1} w='70px' />
            </HStack>
         </Box>
      </Box>
   );
};

export default PostItemSkeleton;
