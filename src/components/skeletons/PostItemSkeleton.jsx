import {
   Box,
   HStack,
   Skeleton,
   SkeletonCircle,
   SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

const PostItemSkeleton = ({ w, h }) => {
   return (
      <Box
         bg='transparent'
         px={['.5rem', '1.5rem']}
         py='.3rem'
         borderRadius='5px'
         mb='1rem'
         w={w}
         mx='auto'
         h={h}
      >
         <HStack>
            <SkeletonCircle size='10' />
            <SkeletonText mt={3} noOfLines={2} spacing='2' w='30%' />
         </HStack>
         <Skeleton h='35px' mt={2} />
         <HStack justify='space-between' mt={2}>
            <HStack>
               <HStack>
                  <Skeleton noOfLines={1} w={['50px', '90px']} h='20px' />
               </HStack>
               <HStack>
                  <Skeleton noOfLines={1} w={['50px', '90px']} h='20px' />
               </HStack>
            </HStack>

            <SkeletonText noOfLines={1} w='70px' />
         </HStack>
      </Box>
   );
};

export default PostItemSkeleton;
