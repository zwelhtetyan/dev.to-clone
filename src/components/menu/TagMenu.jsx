import { Box, HStack, Image, SkeletonText, Text } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useClickTag from '../../hooks/useClickTag';
import { SecondaryBtn } from '../../utils/Buttons';
import SideMenuItem from '../../utils/SideMenuItem';
import { settingIcon } from '../../assets/icons';
import { getPopularTags } from '../../helper/getPopularTags';
import { setLoginAlert } from '../../store/loginAlert';
import { skeletonColor } from '../skeletons/skeletonColor';

const TagMenu = ({ userId, onClose }) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { profileData, profileDataLoading } = useSelector(
      (state) => state.profileData
   );

   const { transformedData } = useSelector((state) => state.transformedData);

   const currentProfile = profileData?.find((data) => data.id === userId);

   const followingTags = currentProfile?.followingTags || [];
   const popularTags = getPopularTags(transformedData).map(
      (tag) => tag.tagName
   );

   const tagsToShow =
      userId && followingTags.length ? followingTags : popularTags;

   const isMyTag = userId && followingTags.length;

   const handleClickTag = useClickTag(onClose);

   const handleClickCustomizeTag = () => {
      if (!userId) {
         dispatch(setLoginAlert(true));
         return;
      }

      onClose && onClose();
      navigate('/dashboard/following_tags');
   };

   return (
      <Box>
         <HStack as='header' p='.5rem ' justify='space-between'>
            <Text fontWeight={700} fontSize='17px'>
               {isMyTag ? 'My Tags' : 'Popular Tags'}
            </Text>

            {isMyTag && (
               <SecondaryBtn onClick={handleClickCustomizeTag}>
                  <Image src={settingIcon} alt='customize_tag_setting' />
               </SecondaryBtn>
            )}
         </HStack>

         <Box pe='.5rem' h='39vh' overflowY='auto'>
            {profileDataLoading && (
               <SkeletonText noOfLines={3} {...skeletonColor} />
            )}
            {tagsToShow.map((tagName) => (
               <SideMenuItem
                  title={`#${tagName}`}
                  key={nanoid()}
                  onClick={(e) => handleClickTag(e, tagName)}
               />
            ))}
         </Box>
      </Box>
   );
};

export default TagMenu;
