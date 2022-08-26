import React from 'react';
import LangTag from '../../utils/LangTag';
import {
   Box,
   HStack,
   Image,
   Text,
   VStack,
   Heading,
   Wrap,
   WrapItem,
   Flex,
} from '@chakra-ui/react';
import heart from '../../assets/logo/heart.svg';
import comment from '../../assets/logo/comment.svg';
import { useNavigate } from 'react-router-dom';
import { ReactionButton } from '../../utils/Buttons';
import CustomAvatar from '../../utils/CustomAvatar';
import { nanoid } from 'nanoid';
import ManangePost from './ManangePost';
import { TooltipWrapper } from '../UserProfilePopup';
import DisplayDate from './DisplayDate';

const PostItem = ({
   name,
   profile,
   coverImg,
   createdAt,
   title,
   tags,
   id,
   readTime,
   isUpdated,
   fromDashboard,
   userId,
   currentUserProfile,
   setAlreadyInProfile,
}) => {
   const navigate = useNavigate();

   const handleNavigate = () => {
      navigate(`/details/${id}`);
   };

   const handleViewProfile = (e) => {
      e.stopPropagation();

      navigate(`/profile/${userId}`);

      if (setAlreadyInProfile) {
         setAlreadyInProfile((val) => !val);
      }
   };

   return (
      <Box
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         _hover={{ boxShadow: '0 0 0 1.5px rgb(23 23 23 / 10%)' }}
         borderRadius={{ base: '0', md: '5px' }}
         cursor='pointer'
         mb='.5rem'
         onClick={handleNavigate}
      >
         {coverImg && (
            <Image
               src={coverImg}
               w='100%'
               mb='1rem'
               borderTopLeftRadius='5px'
               borderTopRightRadius='5px'
               alt='cover_img'
            />
         )}
         <Box p={{ base: '.5rem', sm: '1.5rem' }}>
            <HStack align='flex-start'>
               <HStack align='flex-start'>
                  {/* avatar */}

                  <CustomAvatar
                     profile={profile}
                     size='40px'
                     onClick={handleViewProfile}
                  />

                  <Box>
                     {!currentUserProfile || window.innerWidth <= 768 ? (
                        <Text
                           fontWeight={600}
                           lineHeight={1}
                           fontSize={{ base: '15px', md: '16px' }}
                           onClick={handleViewProfile}
                        >
                           {name}
                        </Text>
                     ) : (
                        <TooltipWrapper currentUserProfile={currentUserProfile}>
                           <Text
                              fontWeight={600}
                              lineHeight={1}
                              fontSize={{ base: '15px', md: '16px' }}
                              onClick={handleViewProfile}
                           >
                              {name}
                           </Text>
                        </TooltipWrapper>
                     )}

                     <DisplayDate createdAt={createdAt} isUpdated={isUpdated} />
                  </Box>
               </HStack>
            </HStack>

            <VStack
               align='flex-start'
               ms={{ base: 'none', md: 'calc(40px + .5rem)' }}
            >
               <Heading
                  cursor='pointer'
                  mt={2}
                  w='100%'
                  _hover={{ color: 'rgb(47 58 178)' }}
                  fontSize={['1.2rem', '1.5rem']}
               >
                  {title}
               </Heading>

               {tags.length !== 0 && (
                  <Wrap spacing='.3rem' py='.5rem' mt='0 !important'>
                     {tags?.map((tag) => (
                        <WrapItem key={nanoid()}>
                           <LangTag tag={tag} />
                        </WrapItem>
                     ))}
                  </Wrap>
               )}

               <HStack justify='space-between' w='100%'>
                  <Box>
                     <HStack>
                        <ReactionButton
                           icon={heart}
                           value={11}
                           text='Reaction'
                           display={{ base: 'none', sm: 'inline-block' }}
                        />
                        <ReactionButton
                           icon={comment}
                           value={11}
                           text='Comment'
                           display={{ base: 'none', sm: 'inline-block' }}
                        />
                     </HStack>
                  </Box>

                  <Flex align='center'>
                     <Text fontSize='13px' color='#717171'>
                        {readTime} min read
                     </Text>
                     {fromDashboard && (
                        <ManangePost postId={id} m='0 0 0 .5rem' />
                     )}
                  </Flex>
               </HStack>
            </VStack>
         </Box>
      </Box>
   );
};

export default React.memo(PostItem);
