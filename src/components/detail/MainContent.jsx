import React from 'react';
import {
   Box,
   Divider,
   Flex,
   Heading,
   HStack,
   Image,
   Text,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import CustomAvatar from '../../utils/CustomAvatar';
import ManangePost from '../post/ManangePost';
import { nanoid } from '@reduxjs/toolkit';
import LangTag from '../../utils/LangTag';
import { htmlToJsx } from '../../helper/htmlToJsx';
import converter from '../../helper/converter';
import Discussion from '../discussion/Discussion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import AllComment from '../comment/AllComment';
import { dateFormat, showEditedDate } from '../../helper/calcTimestamp';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useClickTag from '../../hooks/useClickTag';

const MainContent = ({ postDetail }) => {
   const navigate = useNavigate();
   const user = useAuth();
   const discussionBoxRef = useRef();

   const { clickComment } = useSelector((state) => state.scrollDiscussion);
   const handleClickTag = useClickTag();

   // scroll to
   useEffect(() => {
      const scrollHeight =
         window.pageYOffset +
         discussionBoxRef.current?.getBoundingClientRect().top -
         60;

      if (clickComment) {
         setTimeout(() => window.scrollTo({ top: scrollHeight }), 0);
      } else {
         window.scrollTo(0, 0);
      }
   }, [clickComment, postDetail.id]);

   const isAuthor = user?.userId === postDetail?.userId;

   return (
      <Box
         m={{ base: '0', md: '1px' }}
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         borderRadius={{ base: '0', md: '5px' }}
      >
         {/* coverImgae */}
         {postDetail.cvImg && (
            <Image
               src={postDetail.cvImg}
               alt='cover_image'
               maxH='335px'
               width='100%'
               borderTopLeftRadius={{ base: 'none', md: '5px' }}
               borderTopRightRadius={{ base: 'none', md: '5px' }}
               objectFit='cover'
            />
         )}

         {/* content */}
         <Box px={{ base: '.7rem', md: '2.5rem' }} pb='1rem' pt={3}>
            <Box className='mde-preview'>
               <Flex align='center' justify='space-between' gap='.5rem'>
                  <HStack align='flex-start'>
                     <CustomAvatar
                        profile={postDetail.profile}
                        size='40px'
                        onClick={() => navigate(`/${postDetail.username}`)}
                     />

                     <Box flex='1' pt='3px'>
                        <Text
                           fontWeight={600}
                           cursor='pointer'
                           lineHeight={1.25}
                           _hover={{ color: 'rgb(47 58 178)' }}
                           onClick={() => navigate(`/${postDetail.username}`)}
                        >
                           {postDetail.name}
                        </Text>

                        {postDetail.draft && (
                           <Text
                              bg='#FCD34D'
                              px='5px'
                              fontSize='12px'
                              rounded='sm'
                              display='inline-block'
                           >
                              Draft
                           </Text>
                        )}

                        {postDetail.createdAt && (
                           <Text fontSize='12px' color='#717171'>
                              Posted on {dateFormat(postDetail.createdAt)}{' '}
                              {postDetail.updatedAt && (
                                 <Text as='span'>
                                    {showEditedDate(
                                       postDetail.createdAt,
                                       postDetail.updatedAt
                                    )
                                       ? `• Updated on ${dateFormat(
                                            postDetail.updatedAt
                                         )}`
                                       : '• Updated'}
                                 </Text>
                              )}
                           </Text>
                        )}
                     </Box>
                  </HStack>

                  {/* manage post */}
                  {isAuthor && postDetail && (
                     <ManangePost postId={postDetail.id} m='0 0 0 auto' />
                  )}
               </Flex>

               <Heading my={2} color='rgb(23 23 23)'>
                  {postDetail.title}
               </Heading>

               <Wrap pt='.3rem' pb='1.5rem' spacing={2}>
                  {postDetail.tags.map((tag) => (
                     <WrapItem
                        key={nanoid()}
                        onClick={(e) =>
                           postDetail.draft
                              ? () => {} // don't allow view tag if it's a draft
                              : handleClickTag(e, tag.tagName)
                        }
                     >
                        <LangTag tag={tag} />
                     </WrapItem>
                  ))}
               </Wrap>

               <Box
                  className='mde-preview-content'
                  fontSize={['16px', '17px', '19px']}
                  fontFamily='monospace'
               >
                  {htmlToJsx(converter().makeHtml(postDetail.MDEValue))}
               </Box>

               {!postDetail.draft && (
                  <Divider mt={7} h='1px' background='#efefef' mx='auto' />
               )}

               {!postDetail.draft && (
                  <Discussion
                     discussionBoxRef={discussionBoxRef}
                     postId={postDetail.id}
                     comments={postDetail.comments}
                  />
               )}

               {postDetail.comments.length !== 0 && (
                  <AllComment postDetail={postDetail} />
               )}
            </Box>
         </Box>
      </Box>
   );
};

export default MainContent;
