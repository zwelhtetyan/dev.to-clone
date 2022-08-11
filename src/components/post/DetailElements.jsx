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
import { calTimeStamp, dateFormat } from '../../helper/calcTimestamp';
import { htmlToJsx } from '../../helper/htmlToJsx';
import DetailSkeleton from '../../components/skeletons/DetailSkeleton';
import Discussion from '../../components/discussion/Discussion';
import { nanoid } from 'nanoid';
import CommentItem from '../../components/comment/CommentItem';
import ManangePost from '../../components/ManangePost';
import SideReactionBar from '../../components/SideReactionBar';
import converter from '../../helper/converter';
import '../../styles/postdetail.scss';
import ErrorMessage from '../../utils/ErrorMessage';
import { useAuth } from '../../context/auth';

const DetailElements = ({ postDetail, loading, err, pramId }) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const user = useAuth();

   const isAuthor = user?.userId === postDetail.userId;

   return (
      <Box
         maxW='1200px'
         mx='auto'
         py='0'
         px={{ base: '0', md: '1rem' }}
         mt={{ base: '-.5rem !important', md: '0 !important' }}
         h={{ base: (loading || err) && '50vh' }}
      >
         <Flex align='flex-start'>
            {postDetail && <SideReactionBar />}

            <Box
               w={{ base: '100%', md: '650px' }}
               margin='0 auto !important'
               bg='white'
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               borderRadius='5px'
            >
               {/* coverImgae */}
               {postDetail?.cvImg.url && (
                  <Image
                     src={postDetail.cvImg.url}
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
                  {!postDetail && loading && <DetailSkeleton />}

                  {!loading && err && <ErrorMessage />}

                  {postDetail && (
                     <Box>
                        <Flex
                           align='center'
                           justify='space-between'
                           wrap='wrap'
                        >
                           <HStack pt={3}>
                              <Avatar
                                 name='Zwel'
                                 src={postDetail.profile}
                                 w='40px'
                                 h='40px'
                              />
                              <Box>
                                 <HStack>
                                    <Text fontWeight={600} lineHeight={1}>
                                       {postDetail.name}
                                    </Text>
                                    {postDetail.isUpdated && (
                                       <Text fontSize='11px' color='#717171'>
                                          (updated)
                                       </Text>
                                    )}
                                 </HStack>
                                 <Text fontSize='12px' color='#717171'>
                                    {dateFormat(postDetail.createdAt)} (
                                    <Moment fromNow>
                                       {calTimeStamp(postDetail.createdAt)}
                                    </Moment>
                                    )
                                 </Text>
                              </Box>
                           </HStack>

                           {isAuthor && <ManangePost />}
                        </Flex>

                        <Heading mt={2}>{postDetail.title}</Heading>

                        <Wrap py={2} spacing={2}>
                           {postDetail.filteredTags.map((tag) => (
                              <WrapItem key={nanoid()}>
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

                        <Discussion
                           id={pramId}
                           comments={postDetail.comments}
                        />

                        <Box mt='2rem'>
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
