import React from 'react';
import { Avatar, Box, HStack, Text, VStack } from '@chakra-ui/react';
import { ReactionButton } from '../../utils/Buttons';
import z from '../../assets/images/z.jpeg';
import heart from '../../assets/logo/heart.svg';
import red_heart from '../../assets/logo/red_heart.svg';
import comment from '../../assets/logo/comment.svg';
import OptionBtn from '../../utils/OptionBtn';
import { dateFormat } from '../../helper/calcTimestamp';
import { htmlToJsx } from '../../helper/htmlToJsx';
import converter from '../../helper/converter';
import 'react-mde/lib/styles/css/react-mde-all.css';

const CommentItem = ({ text, createdAt }) => {
   return (
      <VStack mb='1rem'>
         <HStack align='flex-start' w='100%'>
            <Avatar
               name='zwel'
               src={z}
               w='32px'
               h='32px'
               cursor='pointer'
               transition='.3s'
               _hover={{ filter: 'drop-shadow(0px 0px 2px rgb(59 73 223))' }}
            />

            <Box
               boxShadow='0 0 0 1px rgb(23 23 23 / 13%)'
               p={{ base: '.5rem .7rem', sm: '.5rem 1rem' }}
               borderRadius='5px'
               _hover={{ svg: { fill: 'black' } }}
               w='100%'
               overflow='hidden'
            >
               <HStack justify='space-between' mb={1}>
                  <Text fontSize='15px' fontWeight='900'>
                     Zwel Htet Yan {''}
                     <Text as='span' color='gray'>
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
                        {/* <Moment fromNow>{calTimeStamp(createdAt)}</Moment> */}
                     </Text>
                  </Text>

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
         </HStack>
         <HStack justify='flex-start' w='100%' ps='43px'>
            <ReactionButton icon={heart} value={11} text='like' />
            <ReactionButton icon={comment} value={1} text='reply' />
         </HStack>
      </VStack>
   );
};

export default CommentItem;
