import React from 'react';
import { Flex, useColorModeValue } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useLocation } from 'react-router-dom';

const SortNavbar = ({ handleClickNavItem }) => {
   const location = useLocation();
   const activeLinkColor = useColorModeValue('#090909', '#f9f9f9');

   const NavItem = styled.div`
      padding: 0.5rem 1rem;
      border-radius: 5px;
      font-size: 17px;
      cursor: pointer;
      color: ${useColorModeValue('#575757', '#bdbdbd')};

      &:hover {
         background-color: ${useColorModeValue(
            'rgb(255 255 255)',
            'rgb(23 23 23)'
         )};
         color: ${useColorModeValue('rgb(47 58 178)', 'rgb(165, 180, 252)')};
      }
   `;

   const activeLink = (isActive) => {
      return isActive
         ? {
              color: activeLinkColor,
              fontWeight: '600',
           }
         : {};
   };

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
