import React, { useEffect } from 'react';
import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { ReactionButton } from '../../utils/Buttons';
import heart from '../../assets/icons/heart.svg';
import red_heart from '../../assets/icons/red_heart.svg';
import comment from '../../assets/icons/comment.svg';
import { dateFormat, showEditedDate } from '../../helper/calcTimestamp';
import { htmlToJsx } from '../../helper/htmlToJsx';
import converter from '../../helper/converter';
import CustomAvatar from '../../utils/CustomAvatar';
import { useNavigate } from 'react-router-dom';
import authorIcon from '../../assets/icons/authorIcon.svg';
import { useState } from 'react';
import DiscussionBox from '../discussion/DiscussionBox';
import useClickLikeToComment from '../../hooks/useClickLikeToComment';
import ManageComment from './ManageComment';
import { FiCornerLeftUp } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { setLoginAlert } from '../../store/loginAlert';

const CommentItem = ({
   text,
   createdAt,
   currentUserProfile,
   userId,
   postId,
   commentId,
   comments,
   likes,
   authorId,
   currentUserId,
   ps,
   footerPs,
   avatarSize,
   edited,
   editedAt,
   reply,
   repliedUserName,
}) => {
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const [showDiscussionBox, setShowDiscussionbox] = useState(false);

   const { handleClickLike, updatingLike } = useClickLikeToComment(
      currentUserId,
      postId
   );

   const handleViewProfile = (userId) => {
      navigate(`/profile/${userId}`);
   };

   const totalLike = likes.length;
   const alreadyLiked = likes.includes(currentUserId);

   const handleshowDiscussionBox = () => {
      if (!currentUserId) {
         dispatch(setLoginAlert(true));
         return;
      }

      setShowDiscussionbox((prev) => !prev);
   };

   // auto focus when click reply
   // give commentId for each comment item and when showDiscussionBox is true , select editor inside this specific id and focus it
   useEffect(() => {
      if (showDiscussionBox) {
         document.querySelector(`#comment${commentId} .mde-text`).focus();
      }
   }, [showDiscussionBox, commentId]);

   return (
      <VStack mb={['.7rem', '1rem']} ps={ps} id={`comment${commentId}`}>
         <Flex align='flex-start' w='100%'>
            <CustomAvatar
               size={avatarSize}
               profile={currentUserProfile.profile}
               onClick={() => handleViewProfile(currentUserProfile.id)}
            />

            <Box
               boxShadow='0 0 0 1px rgb(23 23 23 / 13%)'
               p={{ base: '.5rem .7rem', sm: '.5rem 1rem' }}
               borderRadius='5px'
               _hover={{
                  '.more-icon': { fill: 'black' },
                  '.arrow-up': { color: 'black' },
               }}
               w='100%'
               flex='1'
               ms='.5rem'
               overflow='hidden'
            >
               <Flex justify='space-between' mb={2}>
                  <HStack align='center' spacing='2px'>
                     <Text
                        fontSize='15px'
                        fontWeight='900'
                        cursor='pointer'
                        onClick={() => handleViewProfile(currentUserProfile.id)}
                     >
                        {currentUserProfile.name}
                     </Text>
                     {authorId === userId && (
                        <Image
                           src={authorIcon}
                           alt='author_icon'
                           title='author'
                        />
                     )}

                     {/* show Date */}
                     <Text fontSize='12px' color='#717171'>
                        • {dateFormat(createdAt)}{' '}
                        {edited && (
                           <Text as='span'>
                              {showEditedDate(createdAt, editedAt)
                                 ? `• Edited on ${dateFormat(editedAt)}`
                                 : '• Edited'}
                           </Text>
                        )}
                     </Text>
                  </HStack>

                  {/* option menu */}
                  {currentUserId === userId && (
                     <ManageComment
                        commentId={commentId}
                        postId={postId}
                        comments={comments}
                     />
                  )}
               </Flex>

               <Box
                  fontSize={{ base: '14px', sm: '16px' }}
                  fontFamily='monospace'
                  sx={{ p: { marginBottom: '5px !important' } }}
               >
                  {reply && repliedUserName !== currentUserProfile.name && (
                     <Text
                        as='div'
                        fontSize='13px'
                        color='#717171'
                        opacity='.7'
                        mt='-7px !important'
                        mb='.5rem !important'
                        fontFamily='sans-serif'
                     >
                        <FiCornerLeftUp
                           className='arrow-up'
                           style={{ display: 'inline-block' }}
                        />{' '}
                        reply to {repliedUserName}
                     </Text>
                  )}

                  <Box className='mde-preview-content'>
                     {htmlToJsx(converter().makeHtml(text))}
                  </Box>
               </Box>
            </Box>
         </Flex>

         <Box w='100%' ps={footerPs} mt='.3rem !important'>
            {!showDiscussionBox && (
               <HStack justify='flex-start'>
                  <ReactionButton
                     icon={alreadyLiked ? red_heart : heart}
                     value={totalLike < 1 ? '' : totalLike}
                     text={
                        totalLike < 1 ? '' : totalLike === 1 ? 'like' : 'likes'
                     }
                     disabled={updatingLike}
                     onClick={() => handleClickLike(comments, commentId)}
                  />
                  <ReactionButton
                     icon={comment}
                     text='reply'
                     onClick={handleshowDiscussionBox}
                  />
               </HStack>
            )}

            {showDiscussionBox && (
               <DiscussionBox
                  postId={postId}
                  showDismiss={true}
                  onDismiss={handleshowDiscussionBox}
                  commentId={commentId}
                  repliedUserId={userId}
               />
            )}
         </Box>
      </VStack>
   );
};

export default CommentItem;
