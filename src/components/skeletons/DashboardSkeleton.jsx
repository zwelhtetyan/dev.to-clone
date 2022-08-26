import React from 'react';
import { Box, HStack, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

const ReactionBox = () => {
   return (
      <VStack
         flex='1'
         justify='center'
         p='1rem'
         h='110px'
         bg='rgb(250 250 250)'
         boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
         borderRadius='5px'
      >
         <Skeleton h='20px' w='30px' />
         <SkeletonText noOfLines={1} w='100px' mx='auto' />
      </VStack>
   );
};

const DashboardSkeleton = () => {
   return (
      <Box maxW='650px' h='calc(100vh - 120px)' mx='auto'>
         <Box mt={2} px='.5rem'>
            <Skeleton height='30px' w='200px' mb='1.5rem' />

            <HStack spacing={[2, 3, 5]} mb={6}>
               <ReactionBox />
               <ReactionBox />
            </HStack>
         </Box>
      </Box>
   );
};

export default DashboardSkeleton;
