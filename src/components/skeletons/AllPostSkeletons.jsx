import {
   Box,
   HStack,
   Skeleton,
   SkeletonCircle,
   SkeletonText,
} from '@chakra-ui/react';
import React from 'react';

const AllPostSkeletons = () => {
   return (
      <Box
         bg='transparent'
         p={6}
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         borderRadius='5px'
         mb={2}
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

export default AllPostSkeletons;
