import { Box } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import { isPrebuiltTag } from '../../helper/isPrebuiltTag';
import TagCard from '../../pages/tags/TagCard';
import NoDataMessage from './NoDataMessage';

const FollowingTag = () => {
   const user = useAuth();

   const { profileData, profileDataLoading } = useSelector(
      (state) => state.profileData
   );

   const currentProfile = profileData?.find((data) => data.id === user.userId);
   const followingTags = currentProfile?.followingTags || [];
   const transformedFollowingTags = followingTags.map(
      (tagName) =>
         isPrebuiltTag(tagName) || {
            brandColor: '#3B49DF',
            tagName,
         }
   );

   if (!transformedFollowingTags.length) {
      return <NoDataMessage title={`You don't follow any tags yet...`} />;
   }

   return (
      <Box
         display='grid'
         gap={{ base: '.5rem', md: '1rem' }}
         p={{ base: '.5rem', md: 0 }}
         gridTemplateColumns={{
            sm: 'repeat(2, minmax(0, 1fr))',
            xl: 'repeat(3, minmax(0, 1fr))',
         }}
      >
         {transformedFollowingTags.map((tag) => (
            <TagCard
               {...tag}
               key={nanoid()}
               profileData={profileData}
               profileDataLoading={profileDataLoading}
               borderTopWidth='.5rem'
               hideFollowBtn={true}
               lineClamp={2}
            />
         ))}
      </Box>
   );
};

export default FollowingTag;
