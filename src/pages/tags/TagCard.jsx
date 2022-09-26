import { Box, Button, Image, Tag, Text } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import useFollowTag from '../../hooks/useFollowTag';
import { LightBtn } from '../../utils/Buttons.jsx';

const TagCard = ({
   brandColor,
   tagName,
   description,
   logo,
   publishedPosts,
   profileData,
   profileDataLoading,
   borderTopWidth,
   hideFollowBtn,
   lineClamp,
}) => {
   const navigate = useNavigate();
   const user = useAuth();
   const userId = user?.userId;

   const handleViewTag = () => {
      navigate(`/tags/${tagName}`);
   };

   const { followTagHandler, loading } = useFollowTag(profileData);

   const handleClickFollow = () => followTagHandler(tagName);

   const currentUserProfile = profileData?.find((data) => data.id === userId);
   const alreadyFollow = currentUserProfile?.followingTags?.includes(tagName);

   return (
      <Box
         borderRadius='5px'
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         color='rgb(23 23 23)'
         borderTop={`${borderTopWidth || '1rem'} solid ${brandColor}`}
         p={{ base: '.7rem', md: '1rem' }}
         position='relative'
      >
         <Tag
            border='1px solid'
            borderColor='gray.100'
            _hover={{ borderColor: 'gray.300', bg: 'gray.100' }}
            bg='white'
            borderRadius='5px'
            cursor='pointer'
            _active={{ bg: 'white' }}
            h='35px'
            fontWeight={700}
            fontSize='1.1rem'
            mb={1}
            onClick={handleViewTag}
         >
            <Text color={brandColor}>#</Text>
            {tagName}
         </Tag>

         <Text
            overflow='hidden'
            display='-webkit-box'
            sx={{
               WebkitLineClamp: lineClamp || '3',
               WebkitBoxOrient: 'vertical',
            }}
         >
            {description}
         </Text>

         {publishedPosts ? (
            <Text fontSize='15px' mt={3} mb={6} color='#717171'>
               {publishedPosts} {publishedPosts > 1 ? 'posts' : 'post'}{' '}
               published
            </Text>
         ) : (
            <Text py={7} />
         )}

         {!profileDataLoading && !hideFollowBtn && (
            <>
               {alreadyFollow ? (
                  <LightBtn
                     w='auto'
                     m='0'
                     disabled={loading}
                     onClick={handleClickFollow}
                  >
                     Following
                  </LightBtn>
               ) : (
                  <Button
                     fontWeight={400}
                     onClick={handleClickFollow}
                     disabled={loading}
                  >
                     Follow
                  </Button>
               )}
            </>
         )}

         {logo && (
            <Image
               src={logo}
               w='60px'
               h='60px'
               pos='absolute'
               bottom='5px'
               right='5px'
               alt='tag_logo'
            />
         )}
      </Box>
   );
};

export default TagCard;
