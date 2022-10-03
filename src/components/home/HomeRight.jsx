import { Box, SkeletonText } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector } from 'react-redux';
import { getPopularTags } from '../../helper/getPopularTags';
import { getTopPostsByTag } from '../../helper/getTopPostsByTag';
import useSkeletonColor from '../../hooks/useSkeletonColor';
import HomeRightCard from './HomeRightCard';

const HomeRight = () => {
   const { transformedData, transformedDataLoading } = useSelector(
      (state) => state.transformedData
   );

   const popularTags = getPopularTags(transformedData)
      .map((tag) => tag.tagName)
      .slice(0, 3);

   const skeletonColor = useSkeletonColor();

   return (
      <Box h='50vh' flex='1' ms='1rem' display={{ base: 'none', xl: 'block' }}>
         {transformedDataLoading && (
            <SkeletonText noOfLines={3} {...skeletonColor} />
         )}

         {popularTags.map((tagName) => (
            <HomeRightCard
               key={nanoid()}
               tagName={tagName}
               topPosts={getTopPostsByTag(tagName, transformedData)}
            />
         ))}
      </Box>
   );
};

export default HomeRight;
