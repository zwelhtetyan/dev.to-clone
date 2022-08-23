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
         py='.5rem'
         borderRadius='5px'
         mb='1.5rem'
         w={w}
         mx='auto'
         h={h}
      >
         <HStack>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={2} spacing='2' w='30%' />
         </HStack>
         <Skeleton h='35px' mt={3} />
         <HStack justify='space-between' mt={3}>
            <HStack>
               <HStack>
                  <SkeletonCircle size='5' />
                  <SkeletonText noOfLines={1} w='90px' />
               </HStack>
               <HStack>
                  <SkeletonCircle size='5' />
                  <SkeletonText noOfLines={1} w='90px' />
               </HStack>
            </HStack>

            <SkeletonText noOfLines={1} w='90px' />
         </HStack>
      </Box>
   );
};

export default PostItemSkeleton;
