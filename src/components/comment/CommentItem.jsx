import { Box, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import CustomAvatar from '../../utils/Avatar';
import { ReactionButton } from '../../utils/Buttons';
import z from '../../assets/images/z.jpeg';
import heart from '../../assets/logo/heart.svg';
import red_heart from '../../assets/logo/red_heart.svg';
import comment from '../../assets/logo/comment.svg';
import OptionBtn from '../../utils/OptionBtn';
import { dateFormat } from '../../helper/calcTimestamp';

const CommentItem = ({ text, createdAt }) => {
   return (
      <VStack mb='1rem'>
         <HStack align='flex-start' w='100%'>
            <CustomAvatar name='Zwel' src={z} size='32px' />
            <Box
               boxShadow='0 0 0 1px rgb(23 23 23 / 13%)'
               p={{ base: '.5rem .7rem', sm: '.5rem 1rem' }}
               borderRadius='5px'
               _hover={{ svg: { fill: 'black' } }}
               w='100%'
               overflow='hidden'
               className='comments display_MDEValue'
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
               <Box fontSize={{ base: '15px', sm: '16px' }}>{text}</Box>
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
