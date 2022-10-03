import React, { useEffect } from 'react';
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import { FiSearch } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const SearchInput = (
   { w, display, mb, px, flex, placeholder, route, querySearchTerm },
   ref
) => {
   const navigate = useNavigate();

   const handleSearch = (e) => {
      e.preventDefault();
      ref.current.blur();

      const searchTerm = ref.current.value;

      if (!searchTerm && route === 'search') return;

      const queryName = route === 'search' ? 'spq' : 'stq'; // => searchPostQuery / searchTagQuery
      navigate(`/${route}?${queryName}=${searchTerm}`);
   };

   useEffect(() => {
      if (!querySearchTerm) {
         ref.current.value = '';
      } else {
         ref.current.value = querySearchTerm;
      }
   }, [querySearchTerm, ref]);

   return (
      <Box
         as='form'
         onSubmit={handleSearch}
         display={display}
         px={px || '.5rem'}
         mb={mb}
         flex={flex}
      >
         <InputGroup h='39px' w={w || '100%'}>
            <Input placeholder={placeholder || 'Search...'} ref={ref} />
            <InputRightElement children={<FiSearch size={23} color='gray' />} />
         </InputGroup>
      </Box>
   );
};
export default React.forwardRef(SearchInput);
