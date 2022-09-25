import { Skeleton } from '@chakra-ui/react';
import React from 'react';

const TagCardSkeleton = () => {
   return <Skeleton borderRadius='5px' h={{ base: '180px', md: '210px' }} />;
};

export default TagCardSkeleton;
