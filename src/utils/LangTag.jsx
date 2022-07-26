import { Button, Image, Text } from '@chakra-ui/react';
import { getLogo } from '../helper/getLogo';

const LangTag = ({ tag, handleClickTag }) => {
   return (
      <Button
         onClick={handleClickTag}
         height='28px'
         p='0 .5rem'
         border='1px solid rgb(0 0 0 / 4%)'
         // borderBottom={`0.3px solid ${tag.color} !important`}
         bg='white'
         _hover={{
            bg: '#F5F5F5',
            transform: 'translateY(-1px)',
            borderColor: '#e2e8f0',
         }}
         borderBlock='5px'
      >
         <Image src={getLogo(tag)} alt='logo' w='15px' mr='5px' />
         <Text fontSize='13px' fontWeight='400' textTransform='capitalize'>
            {tag.lang}
         </Text>
      </Button>
   );
};

export default LangTag;
