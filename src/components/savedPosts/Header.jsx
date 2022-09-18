import {
   Box,
   Heading,
   HStack,
   Input,
   InputGroup,
   InputRightElement,
   Select,
} from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLocation } from 'react-router-dom';
import { SecondaryBtn } from '../../utils/Buttons';

const Header = ({
   readingCount,
   archiveCount,
   allTopics,
   selectedTopic,
   handleClickTopic,
   handleSearch,
   toggleViewArchive,
}) => {
   const location = useLocation();

   const handleSelectOption = ({ target }) => {
      handleClickTopic(target.value);
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
                  borderColor='#00000033'
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
               borderColor='#00000033'
               display={['block', 'block', 'none']}
               onChange={handleSelectOption}
               value={selectedTopic}
            >
               {allTopics.map((item) => (
                  <option key={nanoid()} value={item.topic}>
                     {item.topic}
                  </option>
               ))}
            </Select>
         </Box>
      </Box>
   );
};

export default Header;
