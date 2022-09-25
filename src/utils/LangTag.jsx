import { Box, Button, Image, Text } from '@chakra-ui/react';
import { getLogo } from '../helper/getLogo';

const LangTag = ({ children, tag, onAddTag, onDeleteTag, showCloseIcon }) => {
   const src = getLogo(tag);
   return (
      <Button
         onClick={onAddTag}
         height={{ base: '30px', md: '34px' }}
         p='0 .5rem'
         border='1px solid'
         borderColor='gray.100'
         _hover={{ borderColor: 'gray.300', bg: 'gray.100' }}
         bg='white'
         borderRadius='5px'
         cursor='pointer'
         _active={{ bg: 'white' }}
      >
         {src !== '#' ? <Image src={getLogo(tag)} w='15px' /> : '#'}

         <Text
            fontSize={{ base: '13px', md: '15px' }}
            fontWeight='400'
            ms='5px'
            textTransform='lowercase'
         >
            {tag?.tagName}
         </Text>

         {/* get close icon as children */}
         {showCloseIcon && (
            <Box
               ps='.5rem'
               h='100%'
               display='flex'
               alignItems='center'
               cursor='pointer'
               _hover={{ svg: { color: 'red' } }}
               onClick={onDeleteTag}
            >
               {children}
            </Box>
         )}
      </Button>
   );
};

export default LangTag;
