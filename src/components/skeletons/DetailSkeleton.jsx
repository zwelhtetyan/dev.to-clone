import {
   Box,
   HStack,
   Skeleton,
   SkeletonCircle,
   SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

const DetailSkeleton = () => {
   return (
      <Box
         bg='transparent'
         pt='3rem'
         px='.5rem'
         mx='auto'
         maxW='650px'
         h='calc(100vh - 120px)'
      >
         <HStack>
            <SkeletonCircle size='10' />
            <SkeletonText mt='4' noOfLines={2} spacing='2' w='30%' />
         </HStack>
         <Skeleton h='35px' mt={3} />
      </Box>
   );
};

export default DetailSkeleton;
