import { Skeleton } from '@chakra-ui/react';
import React from 'react';
import { skeletonColor } from './skeletonColor';

const TagCardSkeleton = () => {
   return (
      <Skeleton
         borderRadius='5px'
         h={{ base: '180px', md: '210px' }}
         {...skeletonColor}
      />
   );
};

export default TagCardSkeleton;
