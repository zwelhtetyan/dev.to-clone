import { Skeleton } from '@chakra-ui/react';
import React from 'react';
import useSkeletonColor from '../../hooks/useSkeletonColor';

const TagCardSkeleton = () => {
   const skeletonColor = useSkeletonColor();

   return (
      <Skeleton
         borderRadius='5px'
         h={{ base: '180px', md: '210px' }}
         {...skeletonColor}
      />
   );
};

export default TagCardSkeleton;
