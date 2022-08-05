import React, { useEffect } from 'react';
import {
   Avatar,
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
import Moment from 'react-moment';
import LangTag from '../../utils/LangTag';
import z from '../../assets/images/z.jpeg';
import { calTimeStamp } from '../../helper/calcTimestamp';
import { htmlToJsx } from '../../helper/htmlToJsx';
import DetailSkeleton from '../../components/skeletons/DetailSkeleton';
import Discussion from '../../components/discussion/Discussion';
import { nanoid } from 'nanoid';
import CommentItem from '../../components/CommentItem';
import ManangePost from '../../components/ManangePost';
import SideReactionBar from '../../components/SideReactionBar';
import converter from '../../helper/converter';
import '../../styles/postdetail.scss';

const DetailElements = ({ postDetail, loading, err, id }) => {
   //scroll to top
   useEffect(() => {
      window.scrollTo(0, 0);
   }, []);

   return (
      <Box mt='3rem !important' maxW='1200px' mx='auto'>
         <Flex align='flex-start'>
            {postDetail && <SideReactionBar />}

            <Box
               maxW='650px'
               w='100%'
               margin='0 auto !important'
               bg='white'
               border={{ base: 'none', md: '1px solid #E5E5E5' }}
               borderRadius='5px'
            >
               {/* coverImgae */}
               {postDetail?.cvImg.url && (
                  <Image
                     src={postDetail.cvImg.url}
                     alt='cover_image'
                     maxH='300px'
                     width='100%'
                     borderTopLeftRadius='5px'
                     borderTopRightRadius='5px'
                     objectFit='cover'
                  />
               )}

               {/* content */}
               <Box
                  px={{ base: '.5rem', md: '2.5rem' }}
                  pb={{ base: '3rem', md: '1rem' }}
               >
                  {!postDetail && loading && <DetailSkeleton />}

                  {!loading && err && <h1>Error</h1>}

                  {postDetail && (
                     <Box>
                        <HStack justify='space-between' wrap='wrap'>
                           <HStack pt={3}>
                              <Avatar name='Zwel' src={z} w='40px' h='40px' />
                              <Box>
                                 <HStack>
                                    <Text fontWeight={600} lineHeight={1}>
                                       Zwel Htet Yan
                                    </Text>
                                    {postDetail.isUpdated && (
                                       <Text fontSize='11px' color='gray'>
                                          (updated)
                                       </Text>
                                    )}
                                 </HStack>
                                 <Text fontSize='13px' color='gray' mt='-1'>
                                    <Moment fromNow>
                                       {calTimeStamp(postDetail.createdAt)}
                                    </Moment>
                                 </Text>
                              </Box>
                           </HStack>

                           <ManangePost />
                        </HStack>

                        <Heading mt={2}>{postDetail.title}</Heading>

                        <Wrap py={2} spacing={2}>
                           {postDetail.filteredTags.map((tag) => (
                              <WrapItem key={tag.id}>
                                 <LangTag tag={tag} />
                              </WrapItem>
                           ))}
                        </Wrap>

                        <Text as='div' className='display_MDEValue'>
                           {htmlToJsx(
                              converter().makeHtml(postDetail.MDEValue)
                           )}
                        </Text>

                        <Divider mt={5} w='90%' mx='auto' />

                        <Discussion id={id} comments={postDetail.comments} />

                        <Box mt='2rem' className='comments_container'>
                           {postDetail.comments.map((cmt) => (
                              <CommentItem
                                 key={nanoid()}
                                 text={htmlToJsx(cmt.value)}
                                 createdAt={cmt.createdAt}
                              />
                           ))}
                        </Box>
                     </Box>
                  )}
               </Box>
            </Box>
         </Flex>
      </Box>
   );
};

export default DetailElements;
