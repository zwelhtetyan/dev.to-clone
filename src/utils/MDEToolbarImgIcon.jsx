import { Box, Input } from '@chakra-ui/react';
import React from 'react';
import { FaImage } from 'react-icons/fa';

const MDEToolbarImgIcon = ({ onChange }) => {
   return (
      <Box
         justify='center'
         m='0'
         cursor='pointer'
         w='18px'
         h='18px'
         pos='relative'
         d='flex'
         alignItems='center'
         justifyContent='center'
      >
         <Input
            pos='absolute'
            opacity={0}
            w='18px'
            h='18px'
            type='file'
            bg='pink'
            cursor='pointer'
            zIndex='2'
            accept='image/jpeg, image/png, image/jpg , image/webp, image/gif'
            onChange={onChange}
         />
         <FaImage
            size={18}
            style={{ position: 'absolute', cursor: 'pointer', zIndex: '1' }}
         />
      </Box>
   );
};

export default MDEToolbarImgIcon;
