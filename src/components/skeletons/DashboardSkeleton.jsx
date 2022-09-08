import React from 'react';
import { Box, Flex, Skeleton, SkeletonText, VStack } from '@chakra-ui/react';

const ReactionBox = ({ m }) => {
   return (
      <VStack
         flex='1'
         justify='center'
         p='1rem'
         h='110px'
         bg='rgb(250 250 250)'
         boxShadow='0 0 0 1px rgb(23 23 23 / 5%)'
         borderRadius='5px'
         m={m}
      >
         <Skeleton h='20px' w='30px' />
         <SkeletonText noOfLines={1} w='150px' mx='auto' />
      </VStack>
   );
};

const DashboardSkeleton = () => {
   return (
      <Box maxW='650px' flex='1' w='100%' mx='auto'>
         <Box mt={2} px='.5rem'>
            <Skeleton height='25px' w='200px' mb='1.5rem' />

            <Flex direction={{ base: 'column', sm: 'row' }}>
               <ReactionBox m={{ base: '0 0 .5rem 0', sm: '0 .5rem 0 0' }} />
               <ReactionBox />
            </Flex>
         </Box>
      </Box>
   );
};

export default DashboardSkeleton;
