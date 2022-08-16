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
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import {
   calTimeStamp,
   dateFormat,
   isLimitedDate,
} from '../../helper/calcTimestamp';
import { ReactionButton } from '../../utils/Buttons';
import CustomAvatar from '../../utils/Avatar';
import { nanoid } from 'nanoid';
import ManangePost from '../ManangePost';
import { TooltipWrapper } from '../UserProfilePoupu';

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
   draftPost,
   userId,
   currentUserProfile,
}) => {
   const navigate = useNavigate();

   const handleNavigate = (e) => {
      e.stopPropagation();
      navigate(`/details/${id}`);
   };

   const handleViewProfile = (e) => {
      e.stopPropagation();
      navigate(`/profile/${userId}`);
   };

   return (
      <Box
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         _hover={{ boxShadow: '0 0 0 1.5px rgb(23 23 23 / 10%)' }}
         borderRadius='5px'
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
               <HStack>
                  {/* avatar */}

                  <CustomAvatar
                     profile={profile}
                     size='40px'
                     onClick={handleViewProfile}
                  />

                  <Box>
                     <HStack>
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
                           <TooltipWrapper
                              currentUserProfile={currentUserProfile}
                           >
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

                        {isUpdated && (
                           <Text fontSize='11px' color='#717171'>
                              (updated)
                           </Text>
                        )}
                     </HStack>

                     <Text fontSize='12px' color='#717171'>
                        {dateFormat(createdAt)}{' '}
                        {!isLimitedDate(createdAt) && (
                           <Text as='span'>
                              (
                              <Moment fromNow>{calTimeStamp(createdAt)}</Moment>
                              )
                           </Text>
                        )}
                     </Text>
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
                        <WrapItem
                           key={nanoid()}
                           onClick={(e) => e.stopPropagation()}
                        >
                           <LangTag tag={tag} />
                        </WrapItem>
                     ))}
                  </Wrap>
               )}

               <HStack justify='space-between' w='100%'>
                  <Box>
                     {!draftPost && (
                        <HStack>
                           <ReactionButton
                              icon={heart}
                              value={11}
                              text='Reaction'
                           />
                           <ReactionButton
                              icon={comment}
                              value={11}
                              text='Comment'
                           />
                        </HStack>
                     )}
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
