import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import { FiSearch } from 'react-icons/fi';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchInput = ({ w, display, mb }) => {
   const searchInputRef = useRef();
   const location = useLocation();
   const navigate = useNavigate();

   const queryParam = new URLSearchParams(location.search);
   const querySearchTerm = queryParam.get('q');

   const handleSearch = (e) => {
      e.preventDefault();
      const searchTerm = searchInputRef.current.value;

      if (!searchTerm) return;

      navigate(`/search?q=${searchTerm}`);
   };

   useEffect(() => {
      if (!querySearchTerm) {
         searchInputRef.current.value = '';
      } else {
         searchInputRef.current.value = querySearchTerm;
      }
   }, [querySearchTerm]);

   return (
      <Box
         as='form'
         onSubmit={handleSearch}
         display={display}
         px='.5rem'
         mb={mb}
      >
         <InputGroup h='39px' w={w || '100%'} borderColor='#00000033'>
            <Input
               placeholder='Search...'
               ref={searchInputRef}
               defaultValue={querySearchTerm}
            />
            <InputRightElement children={<FiSearch size={23} color='gray' />} />
         </InputGroup>
      </Box>
   );
};

export default SearchInput;
