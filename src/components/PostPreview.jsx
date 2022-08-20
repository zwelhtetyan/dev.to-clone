import { Box, Heading, Image, Wrap, WrapItem } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { useSelector } from 'react-redux';
import converter from '../helper/converter';
import { htmlToJsx } from '../helper/htmlToJsx';
import LangTag from '../utils/LangTag';
import NoTitleMessage from '../utils/NoTitleMessage';

const PostPreview = () => {
   const { cvImg, title, tags, MDEValue } = useSelector(
      (state) => state.postData
   );

   return (
      <Box
         h='79vh'
         overflowY='auto'
         fontFamily='monospace'
         fontSize={{ base: '1rem', sm: '1.1rem' }}
         className='mde-preview'
      >
         {cvImg && (
            <Image
               src={cvImg}
               alt='cover_image'
               w='100%'
               maxH='300px'
               objectFit='cover'
            />
         )}
         {title ? <Heading mt={2}>{title}</Heading> : <NoTitleMessage />}
         {tags && tags.length !== 0 && (
            <Wrap py={2} spacing={2} fontFamily='sans-serif'>
               {tags.map((tag) => (
                  <WrapItem key={nanoid()}>
                     <LangTag tag={tag} />
                  </WrapItem>
               ))}
            </Wrap>
         )}
         <Box className='mde-preview-content'>
            {htmlToJsx(converter().makeHtml(MDEValue))}
         </Box>
      </Box>
   );
};

export default PostPreview;
