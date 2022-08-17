import { Button, Image, Text } from '@chakra-ui/react';
import { getLogo } from '../helper/getLogo';

const LangTag = ({ tag, handleClickTag }) => {
   const src = getLogo(tag);
   return (
      <Button
         onClick={handleClickTag}
         height='28px'
         p='0 .5rem'
         border='1px solid rgb(0 0 0 / 4%)'
         bg='white'
         _hover={{ borderColor: 'rgb(0 0 0 / 14%)' }}
         borderRadius='5px'
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
      </Button>
   );
};

export default LangTag;
