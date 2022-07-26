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

const ReactionButton = ({ img, text }) => {
   return (
      <Button
         h='30px'
         bg='white'
         border='1px solid rgba(0, 0, 0, 0.04)'
         _hover={{ bg: 'rgba(0, 0, 0, 0.04)' }}
      >
         <Image src={img} />
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

const PostItem = ({ coverImg }) => {
   return (
      <Box bg='white'>
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
         <Box p={{ base: '.5rem', md: '1.5rem' }} mb='.5rem' borderRadius='5px'>
            <HStack>
               <Avatar name='Zwel' src={z} w='40px' h='40px' />
               <Box>
                  <Text fontWeight={600} lineHeight={1}>
                     Zwel Htet Yan
                  </Text>
                  <Text fontSize='13px' color='gray'>
                     1 hour ago
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
                  Why REACT is the most popular library.
               </Heading>

               <Wrap spacing='.3rem'>
                  <WrapItem>
                     <LangTag
                        tag={{ id: 5, lang: 'nodejs', color: '#A2D95E' }}
                     />
                  </WrapItem>
                  <WrapItem>
                     <LangTag tag={{ id: 5, lang: 'svelte', color: 'red' }} />
                  </WrapItem>
                  <WrapItem>
                     <LangTag
                        tag={{ id: 5, lang: 'typescript', color: 'blue' }}
                     />
                  </WrapItem>
                  <WrapItem>
                     <LangTag
                        tag={{ id: 5, lang: 'javascript', color: 'gold' }}
                     />
                  </WrapItem>
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
