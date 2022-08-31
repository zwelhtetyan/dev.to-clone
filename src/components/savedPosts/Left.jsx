import { Box } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import SideMenuItem from '../../utils/SideMenuItem';

const Left = ({ allTopics, handleClickTopic }) => {
   return (
      <Box w='230px' p='.5rem' display={{ base: 'none', md: 'block' }}>
         {allTopics.map((item) => (
            <SideMenuItem
               bg={item.active && 'rgb(59 73 223 / 10%)'}
               color={item.active && 'rgb(47 58 178)'}
               key={nanoid()}
               title={item.topic === 'All tags' ? item.topic : `#${item.topic}`}
               onClick={() => handleClickTopic(item.topic)}
            />
         ))}
      </Box>
   );
};

export default Left;
