import React, { useEffect } from 'react';
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
import ErrorMessage from '../../utils/ErrorMessage';
import { useAuth } from '../../context/auth';
import 'react-mde/lib/styles/css/react-mde-all.css';
import '../../styles/postdetail.scss';
import CustomAvatar from '../../utils/Avatar';
import { useNavigate } from 'react-router-dom';

const DetailElements = ({ postDetail, loading, err, postId }) => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const navigate = useNavigate();

   const user = useAuth();

   const isAuthor = user?.userId === postDetail?.userId;

   return (
      <Box
         maxW='1200px'
         mx='auto'
         py='0'
         px={{ base: '0', md: '1rem' }}
         mt={{ base: '-.5rem !important', md: '0 !important' }}
      >
         {!postDetail && loading && <DetailSkeleton />}

         {!postDetail && !loading && !err && (
            <ErrorMessage urlNotFound={true} />
         )}

         {!postDetail && !loading && err && <ErrorMessage offline={true} />}

         {postDetail && (
            <Flex align='flex-start'>
               <SideReactionBar />

               <Box
                  w={{ base: '100%', md: '650px' }}
                  margin='0 auto !important'
                  bg='white'
                  boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
                  borderRadius='5px'
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
                                 <HStack>
                                    <Text
                                       fontWeight={600}
                                       cursor='pointer'
                                       lineHeight={1}
                                       _hover={{ color: 'rgb(47 58 178)' }}
                                    >
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

                           {isAuthor && postDetail && (
                              <ManangePost
                                 // postDetail={postDetail}
                                 postId={postId}
                              />
                           )}
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
                           {htmlToJsx(
                              converter().makeHtml(postDetail.MDEValue)
                           )}
                        </Box>

                        <Divider
                           mt={7}
                           w='95%'
                           h='1px'
                           background='#7a7a7a'
                           mx='auto'
                        />

                        <Discussion
                           id={postId}
                           comments={postDetail.comments}
                        />

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
            </Flex>
         )}
      </Box>
   );
};

export default DetailElements;
