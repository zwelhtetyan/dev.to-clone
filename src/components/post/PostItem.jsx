import React from 'react';
import LangTag from '../../utils/LangTag';
import {
   Box,
   HStack,
   Image,
   Avatar,
   Text,
   VStack,
   Heading,
   Wrap,
   WrapItem,
   Button,
} from '@chakra-ui/react';
import heart from '../../assets/logo/heart.svg';
import comment from '../../assets/logo/comment.svg';
import z from '../../assets/images/z.jpeg';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { calTimeStamp } from '../../helper/calcTimestamp';

const ReactionButton = ({ img, text }) => {
   return (
      <Button
         h='30px'
         bg='white'
         border='1px solid rgba(0, 0, 0, 0.04)'
         _hover={{ bg: 'rgba(0, 0, 0, 0.04)' }}
      >
         <Image src={img} mr={1} />
         <Text
            fontWeight={400}
            fontSize='14px'
            display={{ base: 'none', md: 'block' }}
         >
            {text}
         </Text>
      </Button>
   );
};

const PostItem = ({ coverImg, createdAt, title, tags, id }) => {
   const navigate = useNavigate();

   const handleNavigate = (e) => {
      e.stopPropagation();
      navigate(`/details/${id}`);
   };

   return (
      <Box
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         _hover={{ boxShadow: '0 0 0 1.5px rgb(23 23 23 / 10%)' }}
         borderRadius='5px'
         cursor='pointer'
         onClick={handleNavigate}
      >
         {coverImg && (
            <Image
               src={coverImg}
               w='100%'
               mb='1rem'
               borderTopLeftRadius='5px'
               borderTopRightRadius='5px'
               alt='cover_img'
            />
         )}
         <Box p={{ base: '.5rem', md: '1.5rem' }} mb='.5rem'>
            <HStack>
               <Avatar name='Zwel' src={z} w='40px' h='40px' />
               <Box>
                  <Text fontWeight={600} lineHeight={1}>
                     Zwel Htet Yan
                  </Text>
                  <Text fontSize='13px' color='gray'>
                     <Moment fromNow>{calTimeStamp(createdAt)}</Moment>
                  </Text>
               </Box>
            </HStack>

            <VStack
               align='flex-start'
               ms={{ base: 'none', md: 'calc(40px + .5rem)' }}
            >
               <Heading
                  cursor='pointer'
                  mt={2}
                  _hover={{ color: 'rgb(47 58 178)' }}
                  fontSize={['1.2rem', '1.5rem']}
               >
                  {title}
               </Heading>

               <Wrap spacing='.3rem' py='.5rem' mt='0 !important'>
                  {tags?.map((tag) => (
                     <WrapItem key={tag.id}>
                        <LangTag tag={tag} />
                     </WrapItem>
                  ))}
               </Wrap>

               <HStack
                  justify='space-between'
                  w='100%'
                  marginTop='15px !important'
               >
                  <HStack>
                     <ReactionButton img={heart} text='Reactions' />
                     <ReactionButton img={comment} text='Comments' />
                  </HStack>

                  <Text fontSize='14px' color='gray'>
                     2 min read
                  </Text>
               </HStack>
            </VStack>
         </Box>
      </Box>
   );
};

export default PostItem;
