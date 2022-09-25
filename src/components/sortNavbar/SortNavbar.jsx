import React from 'react';
import { Flex } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

const NavItem = styled.div`
   padding: 0.5rem 1rem;
   border-radius: 5px;
   font-size: 17px;
   cursor: pointer;

   &:hover {
      background-color: white;
      color: rgb(47 58 178);
   }
`;

const activeLink = (isActive) => {
   return isActive
      ? {
           color: '#090909',
           fontWeight: '600',
        }
      : {};
};

const SortNavbar = ({ handleClickNavItem }) => {
   const location = useLocation();

   const queryParam = new URLSearchParams(location.search);
   const sort = queryParam.get('sort');

   return (
      <Flex mb='.5rem' ms={{ base: '.2rem', md: 0 }}>
         <NavItem
            onClick={() => handleClickNavItem('relevant')}
            style={activeLink(sort === null)}
         >
            Relevant
         </NavItem>
         <NavItem
            onClick={() => handleClickNavItem('latest')}
            style={activeLink(sort === 'latest')}
         >
            Latest
         </NavItem>
         <NavItem
            onClick={() => handleClickNavItem('top')}
            style={activeLink(sort === 'top')}
         >
            Top
         </NavItem>
      </Flex>
   );
};

export default SortNavbar;
