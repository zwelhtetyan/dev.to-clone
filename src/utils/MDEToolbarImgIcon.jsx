import { Box, Input } from '@chakra-ui/react';
import React from 'react';
import { BsCardImage } from 'react-icons/bs';

const MDEToolbarImgIcon = ({ onChange }) => {
   const handleClick = () => {
      document.querySelector('.toolbar_img_command').click();
   };

   return (
      <Box
         onClick={handleClick}
         justify='center'
         m='0'
         cursor='pointer'
         w='35px'
         h='30px'
         pos='absolute'
         display='flex'
         alignItems='center'
         justifyContent='center'
      >
         <Input
            className='toolbar_img_command'
            opacity={0}
            visibility='hidden'
            w='0'
            h='0'
            type='file'
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
