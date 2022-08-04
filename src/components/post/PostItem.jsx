import React from 'react';
import LangTag from '../../utils/LangTag';
import {
   Box,
   HStack,
   Image,
   Text,
   VStack,
   Heading,
   Wrap,
   WrapItem,
} from '@chakra-ui/react';
import heart from '../../assets/logo/heart.svg';
import comment from '../../assets/logo/comment.svg';
import z from '../../assets/images/z.jpeg';
import Moment from 'react-moment';
import { useNavigate } from 'react-router-dom';
import { calTimeStamp } from '../../helper/calcTimestamp';
import { ReactionButton } from '../../utils/Buttons';
import CustomAvatar from '../../utils/Avatar';

const PostItem = ({
   coverImg,
   createdAt,
   title,
   tags,
   id,
   readTime,
   isUpdated,
}) => {
   const navigate = useNavigate();

   const handleNavigate = (e) => {
      e.stopPropagation();
      navigate(`/details/${id}`);
   };

   const handleViewProfile = (e) => {
      e.stopPropagation();
   };

   return (
      <Box
         bg='white'
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         _hover={{ boxShadow: '0 0 0 1.5px rgb(23 23 23 / 10%)' }}
         borderRadius='5px'
         cursor='pointer'
         mb='.5rem'
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
         <Box p={{ base: '.5rem', md: '1.5rem' }}>
            <HStack align='flex-start'>
               <HStack>
                  <CustomAvatar
                     name='Zwel'
                     src={z}
                     size='40px'
                     onClick={handleViewProfile}
                  />
                  <Box>
                     <HStack>
                        <Text
                           fontWeight={600}
                           lineHeight={1}
                           _hover={{ opacity: '.8' }}
                           onClick={handleViewProfile}
                           fontSize={{ base: '15px', md: '16px' }}
                        >
                           Zwel Htet Yan
                        </Text>
                        {isUpdated && (
                           <Text fontSize='11px' color='gray'>
                              (updated)
                           </Text>
                        )}
                     </HStack>
                     <Text
                        fontSize='13px'
                        color='gray'
                        mt={isUpdated ? '-1.5' : '-0.5'}
                     >
                        <Moment fromNow>{calTimeStamp(createdAt)}</Moment>
                     </Text>
                  </Box>
               </HStack>
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

               {tags.length !== 0 && (
                  <Wrap spacing='.3rem' py='.5rem' mt='0 !important'>
                     {tags?.map((tag) => (
                        <WrapItem
                           key={tag.id}
                           onClick={(e) => e.stopPropagation()}
                        >
                           <LangTag tag={tag} />
                        </WrapItem>
                     ))}
                  </Wrap>
               )}

               <HStack justify='space-between' w='100%'>
                  <HStack>
                     <ReactionButton icon={heart} value={11} text='Reaction' />
                     <ReactionButton icon={comment} value={11} text='Comment' />
                  </HStack>

                  <Text fontSize='13px' color='gray'>
                     {readTime} min read
                  </Text>
               </HStack>
            </VStack>
         </Box>
      </Box>
   );
};

export default PostItem;
