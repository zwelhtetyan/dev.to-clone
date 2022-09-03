import { Box, Input } from '@chakra-ui/react';
import React from 'react';
import { BsCardImage } from 'react-icons/bs';

const MDEToolbarImgIcon = ({ onChange }) => {
   return (
      <Box
         justify='center'
         m='0'
         cursor='pointer'
         w='20px'
         h='20px'
         pos='relative'
         display='flex'
         alignItems='center'
         justifyContent='center'
      >
         <Input
            pos='absolute'
            opacity={0}
            w='21px'
            h='26px'
            type='file'
            bg='pink'
            cursor='pointer'
            zIndex='2'
            accept='image/jpeg, image/png, image/jpg , image/webp, image/gif'
            onChange={onChange}
         />
         <BsCardImage
            size={20}
            style={{ position: 'absolute', cursor: 'pointer', zIndex: '1' }}
         />
      </Box>
   );
};

export default MDEToolbarImgIcon;
