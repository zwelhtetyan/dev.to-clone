import {
   Box,
   Heading,
   HStack,
   Input,
   InputGroup,
   InputRightElement,
   Select,
} from '@chakra-ui/react';
import { nanoid } from '@reduxjs/toolkit';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { SecondaryBtn } from '../../utils/Buttons';

const Header = ({
   readingCount,
   archiveCount,
   allTags,
   selectedTagName,
   handleClickTag,
   handleSearch,
   toggleViewArchive,
}) => {
   const location = useLocation();

   const handleSelectOption = ({ target }) => {
      handleClickTag(target.value);
   };

   const queryParam = new URLSearchParams(location.search);
   const query = queryParam.get('');

   const title = query
      ? `Archive (${archiveCount})`
      : `Reading list (${readingCount})`;

   return (
      <Box px={{ base: '.5rem', md: '0' }}>
         <HStack
            justify='space-between'
            display={{ base: 'flex', md: 'none' }}
            mb='.5rem'
         >
            <Heading fontSize={['1.5rem', '1.5rem', '2rem']}>{title}</Heading>

            <SecondaryBtn onClick={toggleViewArchive}>
               {query ? 'View reading list' : 'View archive'}
            </SecondaryBtn>
         </HStack>

         <HStack justify='space-between'>
            <Heading
               fontSize={['1.5rem', '1.5rem', '2rem']}
               display={{ base: 'none', md: 'block' }}
            >
               {title}
            </Heading>

            <HStack
               w={['100%', '100%', 'auto']}
               ms={{ base: '0 !important', md: '.5rem' }}
            >
               <SecondaryBtn
                  display={{ base: 'none', md: 'block' }}
                  onClick={toggleViewArchive}
               >
                  {query ? 'View Reading List' : 'View archive'}
               </SecondaryBtn>

               <InputGroup
                  h='39px'
                  w={{ base: '100%', md: '250px' }}
                  ms={{ base: '0 !important', md: '0.5rem !important' }}
               >
                  <Input placeholder='Search...' onChange={handleSearch} />
                  <InputRightElement
                     children={<FiSearch size={23} color='gray' />}
                  />
               </InputGroup>
            </HStack>
         </HStack>

         <Box mt={2}>
            <Select
               display={['block', 'block', 'none']}
               onChange={handleSelectOption}
               value={selectedTagName}
            >
               {allTags.map((item) => (
                  <option key={nanoid()} value={item.tagName}>
                     {item.tagName}
                  </option>
               ))}
            </Select>
         </Box>
      </Box>
   );
};

export default Header;
