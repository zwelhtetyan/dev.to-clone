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
import { SecondaryBtn } from '../../utils/Buttons';

const Header = ({
   readingCount,
   allTopics,
   selectedTopic,
   handleClickTopic,
   handleSearch,
}) => {
   const handleSelectOption = ({ target }) => {
      handleClickTopic(target.value);
   };

   return (
      <Box>
         <HStack
            justify='space-between'
            display={{ base: 'flex', md: 'none' }}
            mb='.5rem'
         >
            <Heading fontSize={['1.5rem', '1.5rem', '2rem']}>
               Reading list ({readingCount})
            </Heading>

            <SecondaryBtn>View archive</SecondaryBtn>
         </HStack>

         <HStack justify='space-between'>
            <Heading
               fontSize={['1.5rem', '1.5rem', '2rem']}
               display={{ base: 'none', md: 'block' }}
            >
               Reading list ({readingCount})
            </Heading>

            <HStack
               w={['100%', '100%', 'auto']}
               ms={{ base: '0 !important', md: '.5rem' }}
            >
               <SecondaryBtn display={{ base: 'none', md: 'block' }}>
                  View archive
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
