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

const CommentItem = ({
   text,
   createdAt,
   currentUserProfile,
   createdUserId,
   userId,
}) => {
   const navigate = useNavigate();

   const handleViewProfile = (userId) => {
      navigate(`/profile/${userId}`);
   };

   const isAuthor = createdUserId === userId;

   const [showDiscussionBox, setShowDiscussionbox] = useState(false);

   const handleshowDiscussionBox = () => setShowDiscussionbox((prev) => !prev);

   return (
      <VStack mb='1rem'>
         <Flex align='flex-start' w='100%'>
            <CustomAvatar
               size='25px'
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
                  <Flex align='center'>
                     <Text
                        fontSize='15px'
                        fontWeight='900'
                        cursor='pointer'
                        onClick={() => handleViewProfile(currentUserProfile.id)}
                     >
                        {currentUserProfile.name}{' '}
                     </Text>
                     {isAuthor && (
                        <Image
                           src={authorIcon}
                           alt='author_icon'
                           title='author'
                        />
                     )}
                     <Text as='span' color='gray' me='.5rem'>
                        •
                     </Text>{' '}
                     {''}
                     <Text
                        as='span'
                        fontWeight='400'
                        color='gray'
                        fontSize='12px'
                     >
                        {dateFormat(createdAt)}
                     </Text>
                  </Flex>

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

         <Box w='100%' ps='33px'>
            {!showDiscussionBox && (
               <HStack justify='flex-start'>
                  <ReactionButton icon={heart} value={11} text='like' />
                  <ReactionButton
                     icon={comment}
                     value={1}
                     text='reply'
                     onClick={handleshowDiscussionBox}
                  />
               </HStack>
            )}
            {showDiscussionBox && (
               <DiscussionBox
                  showDismiss={true}
                  onDismiss={handleshowDiscussionBox}
               />
            )}
         </Box>
      </VStack>
   );
};

export default CommentItem;
