import {
   Box,
   HStack,
   Skeleton,
   SkeletonCircle,
   SkeletonText,
} from '@chakra-ui/react';
import React from 'react';
import { skeletonColor } from './skeletonColor';

const SavedPostItemSkeleton = () => {
   return (
      <HStack py='1rem'>
         <HStack flex={1}>
            <SkeletonCircle size='9' {...skeletonColor} />
            <Box flex={1}>
               <SkeletonText noOfLines={2} {...skeletonColor} />
            </Box>
         </HStack>

         <Skeleton
            height={5}
            w='70px'
            ms='2rem !important'
            {...skeletonColor}
         />
      </HStack>
   );
};

export default SavedPostItemSkeleton;
