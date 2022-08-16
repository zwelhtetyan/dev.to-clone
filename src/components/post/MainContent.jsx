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
import CustomAvatar from '../../utils/Avatar';
import ManangePost from '../ManangePost';
import { nanoid } from 'nanoid';
import LangTag from '../../utils/LangTag';
import { htmlToJsx } from '../../helper/htmlToJsx';
import converter from '../../helper/converter';
import Discussion from '../discussion/Discussion';
import CommentItem from '../comment/CommentItem';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import DisplayDate from './DisplayDate';

const MainContent = ({ postDetail, postId }) => {
   const navigate = useNavigate();

   const user = useAuth();

   const isAuthor = user?.userId === postDetail?.userId;

   return (
      <Box
         margin='0 auto !important'
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         borderRadius='5px'
         flex='2'
      >
         {/* coverImgae */}
         {postDetail.cvImg && (
            <Image
               src={postDetail.cvImg}
               alt='cover_image'
               maxH='300px'
               width='100%'
               borderTopLeftRadius={{ base: 'none', md: '5px' }}
               borderTopRightRadius={{ base: 'none', md: '5px' }}
               objectFit='cover'
            />
         )}

         {/* content */}
         <Box
            px={{ base: '.7rem', md: '2.5rem' }}
            pb={{ base: '3rem', md: '1rem' }}
         >
            <Box className='mde-preview'>
               <Flex
                  align='center'
                  justify='space-between'
                  wrap='wrap'
                  gap='.5rem'
               >
                  <HStack pt={3}>
                     <CustomAvatar
                        profile={postDetail.profile}
                        size='40px'
                        onClick={() =>
                           navigate(`/profile/${postDetail.userId}`)
                        }
                     />
                     <Box>
                        <Text
                           fontWeight={600}
                           cursor='pointer'
                           lineHeight={1}
                           _hover={{ color: 'rgb(47 58 178)' }}
                           onClick={() =>
                              navigate(`/profile/${postDetail.userId}`)
                           }
                        >
                           {postDetail.name}
                        </Text>

                        <DisplayDate
                           createdAt={postDetail.createdAt}
                           isUpdated={postDetail.isUpdated}
                        />
                     </Box>
                  </HStack>

                  {isAuthor && postDetail && <ManangePost postId={postId} />}
               </Flex>

               <Heading mt={2}>{postDetail.title}</Heading>

               <Wrap py={2} spacing={2}>
                  {postDetail.filteredTags.map((tag) => (
                     <WrapItem key={nanoid()}>
                        <LangTag tag={tag} />
                     </WrapItem>
                  ))}
               </Wrap>

               <Box
                  className='mde-preview-content'
                  fontSize={['16px', '17px', '19px']}
               >
                  {htmlToJsx(converter().makeHtml(postDetail.MDEValue))}
               </Box>

               <Divider mt={7} h='1px' background='#efefef' mx='auto' />

               <Discussion id={postId} comments={postDetail.comments} />

               <Box mt='2rem'>
                  {postDetail.comments.map((cmt) => (
                     <CommentItem
                        key={nanoid()}
                        text={cmt.value}
                        createdAt={cmt.createdAt}
                     />
                  ))}
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default MainContent;
