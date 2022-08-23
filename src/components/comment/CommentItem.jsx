import React from 'react';
import { Box, Flex, HStack, Image, Text, VStack } from '@chakra-ui/react';
import { ReactionButton } from '../../utils/Buttons';
import heart from '../../assets/logo/heart.svg';
import red_heart from '../../assets/logo/red_heart.svg';
import comment from '../../assets/logo/comment.svg';
import OptionBtn from '../../utils/OptionBtn';
import { dateFormat } from '../../helper/calcTimestamp';
import { htmlToJsx } from '../../helper/htmlToJsx';
import converter from '../../helper/converter';
import CustomAvatar from '../../utils/CustomAvatar';
import { useNavigate } from 'react-router-dom';
import authorIcon from '../../assets/logo/authorIcon.svg';
import { useState } from 'react';
import DiscussionBox from '../discussion/DiscussionBox';
import { updateComment } from '../../lib/api';
import { useDispatch } from 'react-redux';
import { setCurrentComments } from '../../store/comment/currentComments';

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
}) => {
   const navigate = useNavigate();

   const [showDiscussionBox, setShowDiscussionbox] = useState(false);
   const [updatingLike, setUpdatingLike] = useState(false);

   const dispatch = useDispatch();

   const handleViewProfile = (userId) => {
      navigate(`/profile/${userId}`);
   };

   const totalLike = likes.includes(userId)
      ? likes.filter((id) => id !== userId).length - 1
      : likes.length;

   const alreadyLiked =
      (likes.includes(currentUserId) && userId !== currentUserId) ||
      (!likes.includes(currentUserId) && userId === currentUserId);

   const handleshowDiscussionBox = () => {
      if (!currentUserId) {
         navigate('/create-account');
         return;
      }

      setShowDiscussionbox((prev) => !prev);
   };

   /////////////////////////////////// separate file later;

   const handleClickLike = (comments, commentId) => {
      if (!currentUserId) {
         navigate('/create-account');
         return;
      }

      setUpdatingLike(true);

      const modifiedComments = comments.map((comment) => {
         if (comment.commentId === commentId) {
            return {
               ...comment,
               likes: comment.likes.includes(currentUserId)
                  ? comment.likes.filter((id) => id !== currentUserId)
                  : [...comment.likes, currentUserId],
            };
         }

         const innerComments = Object.values(comment.replies);

         if (innerComments.find((cmt) => cmt.commentId === commentId)) {
            const modifiedInnerComments = innerComments.map((cmt) =>
               cmt.commentId === commentId
                  ? {
                       ...cmt,
                       likes: cmt.likes.includes(currentUserId)
                          ? cmt.likes.filter((id) => id !== currentUserId)
                          : [...cmt.likes, currentUserId],
                    }
                  : cmt
            );

            return {
               ...comment,
               replies: { ...modifiedInnerComments },
            };
         }

         return comment;
      });

      dispatch(setCurrentComments(modifiedComments));

      updateComment(modifiedComments, postId)
         .then((_) => {
            setUpdatingLike(false);
            console.log('updated like');
         })
         .catch((err) => {
            setUpdatingLike(false);
            console.log(err);
         });
   };

   ///////////////////////////////////

   return (
      <VStack mb='1rem' ps={ps}>
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
               _hover={{ svg: { fill: 'black' } }}
               w='100%'
               flex='1'
               ms='.5rem'
               overflow='hidden'
            >
               <HStack justify='space-between' mb={1}>
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
                     {/* <Text color='gray'>•</Text> */}
                     <Text color='gray' fontSize='12px'>
                        • {dateFormat(createdAt)}
                     </Text>
                  </HStack>

                  {/* option menu */}
                  <OptionBtn size={19} />
               </HStack>

               <Box
                  fontSize={{ base: '14px', sm: '16px' }}
                  className='mde-preview-content'
                  fontFamily='monospace'
               >
                  {htmlToJsx(converter().makeHtml(text))}
               </Box>
            </Box>
         </Flex>

         <Box w='100%' ps={footerPs}>
            {!showDiscussionBox && (
               <HStack justify='flex-start'>
                  <ReactionButton
                     icon={alreadyLiked ? red_heart : heart}
                     value={totalLike}
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
               />
            )}
         </Box>
      </VStack>
   );
};

export default CommentItem;
