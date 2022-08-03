import {
   Avatar,
   Box,
   Divider,
   Heading,
   HStack,
   Image,
   Text,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useNavigate, useParams } from 'react-router-dom';
import { db } from '../../firebase';
import LangTag from '../../utils/LangTag';
import z from '../../assets/images/z.jpeg';
import { calTimeStamp } from '../../helper/calcTimestamp';
import { htmlToJsx } from '../../helper/htmlToJsx';
import DetailSkeleton from '../skeletons/DetailSkeleton';
import Discussion from '../discussion/Discussion';
import { nanoid } from 'nanoid';
import CommentItem from '../CommentItem';
import '../../styles/postdetail.scss';
import ManangePost from '../ManangePost';

const PostDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   //states
   const [postDetail, setPostDetail] = useState(null);
   const [loading, setLoading] = useState(false);
   const [err, setErr] = useState(false);

   useEffect(() => {
      const docRef = doc(db, 'posts', id);

      setLoading(true);
      onSnapshot(docRef, { includeMetadataChanges: true }, (snapshot) => {
         if (!snapshot.metadata.hasPendingWrites) {
            if (!snapshot.data()) {
               setLoading(false);
               setErr(true);
               return;
            }
            setPostDetail(snapshot.data());
         }
      });

      //onshapshot fire before submitting is finished , that's a reason to add => { includeMetadataChanges: true }
   }, [id]);

   console.log('post detail run');

   //to preview images
   useEffect(() => {
      if (postDetail) {
         const imgTags = [
            ...document.querySelectorAll('.display_MDEValue p img'),
         ];

         imgTags.forEach((img) => {
            img.style.cursor = 'zoom-in';

            img.addEventListener('click', () =>
               navigate(`/preview/${encodeURIComponent(img.src)}`)
            );
         });
      }
   }, [postDetail, navigate, id]);

   return (
      <Box
         maxW='650px'
         m='auto'
         bg='white'
         border={{ base: 'none', md: '1px solid #E5E5E5' }}
         borderRadius='5px'
      >
         {postDetail?.cvImg && (
            <Image
               src={postDetail.cvImg}
               alt='cover_image'
               maxH='300px'
               width='100%'
               borderTopLeftRadius='5px'
               borderTopRightRadius='5px'
               objectFit='cover'
            />
         )}

         <Box px={{ base: '.5rem', md: '2.5rem' }} pb='2rem'>
            {!postDetail && loading && <DetailSkeleton />}
            {!loading && err && <h1>Error</h1>}
            {postDetail && (
               <Box>
                  <HStack justify='space-between'>
                     <HStack pt={3}>
                        <Avatar name='Zwel' src={z} w='40px' h='40px' />
                        <Box>
                           <Text fontWeight={600} lineHeight={1}>
                              Zwel Htet Yan
                           </Text>
                           <Text fontSize='13px' color='gray'>
                              <Moment fromNow>
                                 {calTimeStamp(postDetail.createdAt)}
                              </Moment>
                           </Text>
                        </Box>
                     </HStack>

                     <ManangePost postId={id} />
                  </HStack>

                  <Heading my={2}>{postDetail.title}</Heading>

                  <Wrap py={2} spacing={2}>
                     {postDetail.filteredTags.map((tag) => (
                        <WrapItem key={tag.id}>
                           <LangTag tag={tag} />
                        </WrapItem>
                     ))}
                  </Wrap>

                  <Text as='div' className='display_MDEValue'>
                     {htmlToJsx(postDetail.MDEValue)}
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
   );
};

export default PostDetails;
