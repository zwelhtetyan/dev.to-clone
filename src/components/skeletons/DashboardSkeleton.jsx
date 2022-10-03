import React from 'react';
import {
   Box,
   Flex,
   Skeleton,
   SkeletonText,
   useColorModeValue,
   VStack,
} from '@chakra-ui/react';
import useSkeletonColor from '../../hooks/useSkeletonColor';

const DashboardSkeleton = () => {
   const skeletonColor = useSkeletonColor();

   const ReactionBox = ({ m }) => {
      return (
         <VStack
            flex='1'
            justify='center'
            p='1rem'
            h='110px'
            bg={useColorModeValue(
               'light.cardSecondaryBg',
               'dark.cardSecondaryBg'
            )}
            className='shadowSecondary'
            borderRadius='5px'
            m={m}
         >
            <Skeleton h='20px' w='30px' {...skeletonColor} />
            <SkeletonText
               noOfLines={1}
               w='150px'
               mx='auto'
               {...skeletonColor}
            />
         </VStack>
      );
   };

   return (
      <Box maxW='650px' flex='1' w='100%' mx='auto'>
         <Box mt={2} px='.5rem'>
            <Skeleton height='25px' w='200px' mb='1.5rem' {...skeletonColor} />

            <Flex direction={{ base: 'column', sm: 'row' }}>
               <ReactionBox m={{ base: '0 0 .5rem 0', sm: '0 .5rem 0 0' }} />
               <ReactionBox />
            </Flex>
         </Box>
      </Box>
   );
};

export default DashboardSkeleton;
