import { Button, Image, Text } from '@chakra-ui/react';

export const PrimaryBtn = ({
   children,
   w,
   display,
   m,
   onClick,
   type,
   bg,
   disabled,
}) => {
   return (
      <Button
         variant='outline'
         color={bg ? 'white' : 'rgb(59 73 223)'}
         bg={bg}
         fontWeight='400'
         borderColor='rgb(59 73 223)'
         w={w}
         type={type}
         display={display}
         disabled={disabled}
         m={m}
         _hover={{
            bg: bg ? 'rgb(42 55 197)' : 'rgb(59 73 223)',
            color: 'white',
         }}
         p='0 0.7rem'
         onClick={onClick}
      >
         {children}
      </Button>
   );
};

export const SecondaryBtn = ({
   children,
   w,
   display,
   onClick,
   color,
   disabled,
   size,
   m,
   name,
}) => {
   return (
      <Button
         name={name}
         variant='ghost'
         fontWeight='400'
         color={color}
         disabled={disabled}
         m={m}
         size={size}
         type='button'
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

export const ReactionButton = ({
   icon,
   value,
   text,
   onClick,
   disabled,
   display,
}) => {
   return (
      <Button
         h='30px'
         bg='white'
         px={1}
         border='1px solid transparent'
         _hover={{ bg: 'rgb(0 0 0 / 4%)' }}
         _active={{ bg: 'rgb(0 0 0 / 4%)' }}
         onClick={onClick}
         disabled={disabled}
      >
         <Image src={icon} />
         <Text fontWeight={400} fontSize='14px'>
            {value}{' '}
            {text && (
               <Text as='span' display={display} ms={1}>
                  {text}
               </Text>
            )}
         </Text>
      </Button>
   );
};
