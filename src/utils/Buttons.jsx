import { Button } from '@chakra-ui/react';

export const PrimaryBtn = ({ children, w, display, m, onClick }) => {
   return (
      <Button
         variant='outline'
         color='rgb(59 73 223)'
         fontWeight='400'
         borderColor='rgb(59 73 223)'
         w={w}
         display={display}
         m={m}
         _hover={{
            bg: 'rgb(59 73 223)',
            color: 'white',
         }}
         p='0 0.7rem'
         onClick={onClick}
      >
         {children}
      </Button>
   );
};

export const SecondaryBtn = ({ children, w, display, onClick, color }) => {
   return (
      <Button
         variant='ghost'
         fontWeight='400'
         color={color}
         _hover={{
            bg: 'rgb(59 73 223 / 10%)',
            color: `${color || 'rgb(47 58 178)'}`,
         }}
         p='0 0.5rem'
         w={w}
         display={display}
         onClick={onClick}
      >
         {children}
      </Button>
   );
};
