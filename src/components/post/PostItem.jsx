import React, { useState } from 'react';
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
import { ReactionButton, SecondaryBtn } from '../../utils/Buttons';
import CustomAvatar from '../../utils/CustomAvatar';
import { nanoid } from '@reduxjs/toolkit';
import ManangePost from './ManangePost';
import UserProfilePopup from '../profile/UserProfilePopup';
import DisplayDate from './DisplayDate';
import { useDispatch } from 'react-redux';
import { setClickComment } from '../../store/scrollDiscussion';
import { RiBookmarkFill, RiBookmarkLine } from 'react-icons/ri';
import useClickReactToPost from '../../hooks/useClickReactToPost';

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
   showHover,
   userId,
   currentUserId,
   currentUserProfile,
   setAlreadyInProfile,
   totalDiscussion,
   totalReaction,
   saved,
   alreadySaved,
   isFirstItem,
   baseRadius,
}) => {
   const [showProfilePopup, setShowProfilePopup] = useState(false);

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const { clickReactHandler: clickSave, updatingReact: updatingSave } =
      useClickReactToPost(saved, id, 'saved');

   const handleClickComment = (e) => {
      e.stopPropagation();

      dispatch(setClickComment(true)); // if user click comment , it will start on where discussions exist 😉
      navigate(`/details/${id}`);
   };

   const handleNavigate = () => {
      dispatch(setClickComment(false));
      navigate(`/details/${id}`);
   };

   const handleViewProfile = (e) => {
      e.stopPropagation();

      navigate(`/profile/${userId}`);

      if (setAlreadyInProfile) {
         setAlreadyInProfile((val) => !val);
      }
   };

   const handleClickSave = (e) => {
      e.stopPropagation();
      clickSave();
   };

   /// showPopup logic start
   let INTERVAl;
   const handleMouseEnter = () => {
      if (window.innerWidth < 768 || !showHover) return;

      INTERVAl = setTimeout(() => setShowProfilePopup(true), 300);
   };

   const handleMouseLeave = () => {
      if (window.innerWidth < 768 || !showHover) return;

      setShowProfilePopup(false);
      clearTimeout(INTERVAl);
   };
   /// showPopup logic end

   return (
      <Box
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         _hover={{ boxShadow: '0 0 0 1.5px rgb(23 23 23 / 10%)' }}
         borderRadius={{ base: `${baseRadius}` || 0, md: '5px' }}
         cursor='pointer'
         mb='.5rem'
         onClick={handleNavigate}
      >
         {coverImg && isFirstItem && (
            <Image
               src={coverImg}
               w='100%'
               maxH='335px'
               objectFit='cover'
               mb='1rem'
               borderTopLeftRadius={{ base: '0', md: '5px' }}
               borderTopRightRadius={{ base: '0', md: '5px' }}
               alt='cover_img'
            />
         )}
         <Box p={{ base: '.5rem', sm: '1rem' }}>
            <HStack align='flex-start'>
               <HStack align='center'>
                  {/* avatar */}

                  <CustomAvatar
                     profile={profile}
                     size='37px'
                     onClick={handleViewProfile}
                  />

                  {/* name and date */}
                  <Box>
                     <Box
                        // _hover={
                        //    showHover && {
                        //       md: { '& .profilePopup': { display: 'block' } },
                        //    }
                        // }

                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        // showing popup when hover takes effect instantly , so I use [mouseEnter & mouseLeave] with 300ms dalay instead .
                     >
                        <Text
                           fontWeight={600}
                           lineHeight={1.25}
                           fontSize={{ base: '15px', md: '16px' }}
                           onClick={handleViewProfile}
                           color='#3d3d3d'
                           _hover={{ color: '#090909' }}
                        >
                           {name}
                        </Text>

                        <UserProfilePopup
                           background={currentUserProfile?.background}
                           profile={currentUserProfile?.profile}
                           name={currentUserProfile?.name}
                           bio={currentUserProfile?.bio}
                           work={currentUserProfile?.work}
                           location={currentUserProfile?.location}
                           education={currentUserProfile?.education}
                           joined={currentUserProfile?.createdAt}
                           id={currentUserProfile?.id}
                           currentUserId={currentUserId}
                           followers={currentUserProfile?.followers || []}
                           pos='absolute'
                           zIndex={1}
                           display={showProfilePopup ? 'block' : 'none'}
                           boxShadow='rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px'
                           borderRadius='5px'
                        />
                     </Box>

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
                  fontSize={['1.1rem', '1.3rem']}
                  color='rgb(23 23 23)'
               >
                  {title}
               </Heading>

               {tags.length !== 0 && (
                  <Wrap spacing='.3rem' pt='.5rem' mt='0 !important'>
                     {tags?.map((tag) => (
                        <WrapItem key={nanoid()}>
                           <LangTag tag={tag} />
                        </WrapItem>
                     ))}
                  </Wrap>
               )}

               <HStack
                  justify='space-between'
                  w='100%'
                  mt={{ md: '.7rem !important' }}
               >
                  {/* reaction buttons */}
                  <Box>
                     <HStack>
                        {totalReaction && (
                           <ReactionButton
                              icon={heart}
                              value={totalReaction}
                              text={
                                 totalReaction > 1 ? 'Reactions' : 'Reaction'
                              }
                           />
                        )}

                        <ReactionButton
                           onClick={handleClickComment}
                           icon={comment}
                           value={totalDiscussion || ''}
                           text={
                              totalDiscussion === 1
                                 ? 'Comment'
                                 : totalDiscussion > 0
                                 ? 'Comments'
                                 : 'Add comment'
                           }
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

                     {userId !== currentUserId && (
                        <Box ms='1rem'>
                           <SecondaryBtn
                              onClick={handleClickSave}
                              disabled={updatingSave}
                           >
                              {alreadySaved ? (
                                 <RiBookmarkFill size={19} />
                              ) : (
                                 <RiBookmarkLine size={19} />
                              )}
                           </SecondaryBtn>
                        </Box>
                     )}
                  </Flex>
               </HStack>
            </VStack>
         </Box>
      </Box>
   );
};

export default React.memo(PostItem);
