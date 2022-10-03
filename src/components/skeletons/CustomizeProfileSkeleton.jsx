import { Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import React from 'react';
import useSkeletonColor from '../../hooks/useSkeletonColor';
import { CustomizeProfileCard } from '../../utils/CustomizeProfileStyles';

const CustomizeProfileSkeleton = () => {
   const skeletonColor = useSkeletonColor();

   return (
      <Flex justify='center' w='100%' flex='1' align='flex-start'>
         <CustomizeProfileCard w='100%' maxWidth='720px' mx='.5rem' mb='1rem'>
            <SkeletonCircle boxSize={'100px'} mx='auto' {...skeletonColor} />

            <Skeleton
               h='15px'
               w='150px'
               mb='.5rem'
               mt='1rem'
               {...skeletonColor}
            />
            <Skeleton
               borderRadius='5px'
               h='40px'
               w='100%'
               mb='1rem'
               {...skeletonColor}
            />
            <Skeleton h='15px' w='150px' mb='.5rem' {...skeletonColor} />
            <Skeleton
               borderRadius='5px'
               h='40px'
               w='100%'
               mb='.5rem'
               {...skeletonColor}
            />
         </CustomizeProfileCard>
      </Flex>
   );
};

export default CustomizeProfileSkeleton;
