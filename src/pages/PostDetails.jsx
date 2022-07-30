import {
   Avatar,
   Box,
   Heading,
   HStack,
   Image,
   Text,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import Moment from 'react-moment';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import LangTag from '../utils/LangTag';
import z from '../assets/images/z.jpeg';
import { calTimeStamp } from '../helper/calcTimestamp';
import { htmlToJsx } from '../helper/htmlToJsx';
import '../styles/postdetail.scss';
import DetailSkeleton from '../components/skeletons/DetailSkeleton';

const PostDetails = () => {
   const { id } = useParams();

   //states
   const [postDetail, setPostDetail] = useState(null);

   useEffect(() => {
      const docRef = doc(db, 'posts', id);
      getDoc(docRef).then((snapshot) => setPostDetail(snapshot.data()));
   }, [id]);

   console.log('post detail run');

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
            {!postDetail && <DetailSkeleton />}
            {postDetail && (
               <Box>
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
               </Box>
            )}
         </Box>
      </Box>
   );
};

export default PostDetails;
