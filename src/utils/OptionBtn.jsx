import { IconButton } from '@chakra-ui/react';
import React from 'react';
import { RiMoreLine } from 'react-icons/ri';

const OptionBtn = ({ size, onClick }) => {
   return (
      <IconButton
         size='sm'
         bg='transparent'
         _hover={{
            bg: 'rgb(59 73 223 / 10%)',
            color: 'rgb(47 58 178)',
         }}
         onClick={onClick}
      >
         <RiMoreLine size={size} color='gray' />
      </IconButton>
   );
};

export default OptionBtn;
