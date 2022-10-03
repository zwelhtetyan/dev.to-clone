import { Box } from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import SideMenuItem from '../../utils/SideMenuItem';

const Left = ({ allTags, handleClickTag }) => {
   return (
      <Box w='230px' display={{ base: 'none', md: 'block' }}>
         {allTags.map((item) => (
            <SideMenuItem
               isActive={item.active}
               key={nanoid()}
               title={
                  item.tagName === 'All tags'
                     ? item.tagName
                     : `#${item.tagName}`
               }
               onClick={() => handleClickTag(item.tagName)}
            />
         ))}
      </Box>
   );
};

export default Left;
