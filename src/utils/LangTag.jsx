import { Box, Button, Image, Text } from '@chakra-ui/react';
import { getLogo } from '../helper/getLogo';

const LangTag = ({ children, tag, onAddTag, onDeleteTag, cursor, h }) => {
   const src = getLogo(tag);
   return (
      <Button
         onClick={onAddTag}
         height={h || '28px'}
         p='0 .5rem'
         border='1px solid'
         borderColor='gray.100'
         _hover={{ borderColor: 'gray.300' }}
         bg='white'
         borderRadius='5px'
         cursor={cursor || 'default'}
         _active={{ bg: 'white' }}
      >
         {src !== '#' ? <Image src={getLogo(tag)} w='15px' /> : '#'}

         <Text
            fontSize='13px'
            fontWeight='400'
            ms='5px'
            textTransform='capitalize'
         >
            {tag?.topic}
         </Text>

         {/* get close icon as children */}
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
      </Button>
   );
};

export default LangTag;
