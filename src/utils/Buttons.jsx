import { Button, Text, useColorModeValue } from '@chakra-ui/react';

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
   const color = useColorModeValue('light.primary', 'dark.primary');

   return (
      <Button
         variant='outline'
         color={bg ? 'white' : color}
         bg={bg}
         fontWeight='400'
         borderColor={!bg ? color : 'light.primary'}
         w={w}
         type={type}
         display={display}
         disabled={disabled}
         m={m}
         _hover={{
            bg: bg ? 'rgb(47 58 178)' : 'rgb(59 73 223)',
            color: 'dark.color',
         }}
         p='0 .7rem'
         onClick={onClick}
         _active={{ bg }}
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
   p,
   name,
}) => {
   const hoverColor = useColorModeValue(
      'light.headingHover',
      'dark.headingHover'
   );

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
            bg: useColorModeValue('light.secondary', 'dark.secondary'),
            color: `${color || hoverColor}`,
         }}
         p={p || '0 .5rem'}
         w={w}
         display={display}
         onClick={onClick}
         _active={{ bg: 'transparent' }}
      >
         {children}
      </Button>
   );
};

export const LightBtn = ({ children, onClick, disabled, w, bg, m }) => {
   return (
      <Button
         w={w || '100%'}
         m={m || '.5rem 0'}
         bg={bg || 'transparent'}
         border='2px solid'
         borderColor={useColorModeValue('#d6d6d7', '#66686c')}
         _hover={{ bg: 'transparent', borderColor: '#a3a3a3' }}
         fontWeight={400}
         color={useColorModeValue('#575757', 'white')}
         _active={{ bg: 'transparent' }}
         disabled={disabled}
         onClick={onClick}
      >
         {children}
      </Button>
   );
};

export const ReactionButton = ({
   value,
   text,
   onClick,
   disabled,
   children,
}) => {
   const ghostColor = useColorModeValue('light.ghostColor', 'dark.ghostColor');

   return (
      <Button
         h={['27px', '30px']}
         px={1}
         bg='transparent'
         border='1px solid transparent'
         _hover={{ bg: useColorModeValue('rgb(0 0 0 / 4%)', 'whiteAlpha.200') }}
         _active={{ bg: 'transparent' }}
         onClick={onClick}
         disabled={disabled}
      >
         {children}
         <Text fontWeight={400} fontSize='14px' color={ghostColor}>
            {value}{' '}
            {text && (
               <Text
                  as='span'
                  display={{ base: 'none', sm: 'inline-block' }}
                  ms={1}
               >
                  {text}
               </Text>
            )}
         </Text>
      </Button>
   );
};

export const BtnRed = ({ children, ...props }) => {
   return (
      <Button
         {...props}
         bg='rgb(220 38 38)'
         _hover={{ bg: 'rgb(185 28 28)' }}
         color='rgb(255 255 255)'
         fontWeight='400'
      >
         {children}
      </Button>
   );
};

export const BtnDefault = ({ children, ...props }) => {
   return (
      <Button
         {...props}
         bg={useColorModeValue('#d6d6d7', '#3d3d3d')}
         _hover={{ bg: useColorModeValue('#bdbdbd', '#575757') }}
         color={useColorModeValue('#3d3d3d', '#d6d6d7')}
         fontWeight='400'
      >
         {children}
      </Button>
   );
};
