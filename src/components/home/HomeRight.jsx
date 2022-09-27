import { Box, SkeletonText } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector } from 'react-redux';
import { getPopularTags } from '../../helper/getPopularTags';
import { skeletonColor } from '../skeletons/skeletonColor';
import HomeRightCard from './HomeRightCard';

const HomeRight = () => {
   const { transformedData, transfromedDataLoading } = useSelector(
      (state) => state.transformedData
   );

   const popularTags = getPopularTags(transformedData)
      .map((tag) => tag.tagName)
      .slice(0, 3);

   return (
      <Box h='50vh' flex='1' ms='1rem' display={{ base: 'none', xl: 'block' }}>
         {transfromedDataLoading && (
            <SkeletonText noOfLines={3} {...skeletonColor} />
         )}

         {popularTags.map((tagName) => (
            <HomeRightCard
               key={nanoid()}
               tagName={tagName}
               transformedData={transformedData}
            />
         ))}
      </Box>
   );
};

export default HomeRight;
