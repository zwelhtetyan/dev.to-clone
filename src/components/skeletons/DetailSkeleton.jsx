import {
   Box,
   HStack,
   Skeleton,
   SkeletonCircle,
   SkeletonText,
} from '@chakra-ui/react';
import React from 'react';
import useSkeletonColor from '../../hooks/useSkeletonColor';

const DetailSkeleton = () => {
   const skeletonColor = useSkeletonColor();

   return (
      <Box
         bg='transparent'
         px='.5rem'
         mx='auto'
         maxW='650px'
         flex='1'
         mt='.5rem'
      >
         <HStack>
            <SkeletonCircle size='10' {...skeletonColor} />
            <SkeletonText
               mt='4'
               noOfLines={2}
               spacing='2'
               w='30%'
               {...skeletonColor}
            />
         </HStack>
         <Skeleton h='15px' mt={3} {...skeletonColor} />
         <Skeleton h='15px' mt={3} {...skeletonColor} />
      </Box>
   );
};

export default DetailSkeleton;
