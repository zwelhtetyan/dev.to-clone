import { Flex, IconButton } from '@chakra-ui/react';
import React from 'react';
import Heart from '../../assets/logo/Heart';
import Unicorn from '../../assets/logo/Unicorn';
import Save from '../../assets/logo/Save';
import Option from '../../assets/logo/Option';

const SideReactionBar = ({ postDetail }) => {
   return (
      <Flex
         bg={{ base: 'white', md: 'transparent' }}
         boxShadow={{ base: '0 -1px 5px rgba(0,0,0,0.2)', md: 'none' }}
         height={{ base: '3.5rem', md: 'auto' }}
         width={{ base: '100vw', md: '50px' }}
         position={{ base: 'fixed', md: 'sticky' }}
         bottom={{ base: '0', md: 'unset' }}
         left='0'
         top={{ base: 'unset', md: '6rem' }}
         zIndex='2'
         direction={{ base: 'row', md: 'column' }}
         align='center'
         justify={{ base: 'space-around', md: 'flex-start' }}
         gap='1rem'
         me='1rem'
      >
         {!postDetail.draft && (
            <Flex direction={{ base: 'row', md: 'column' }} align='center'>
               <IconButton
                  bg='transparent'
                  icon={<Heart />}
                  borderRadius='full'
                  mb={{ base: '0', md: '2' }}
                  mr={{ base: '2', md: '0' }}
                  _hover={{
                     bg: 'rgb(220 38 38 / 10%)',
                     svg: { fill: 'rgb(220 38 38)' },
                  }}
               />
               11
            </Flex>
         )}

         {!postDetail.draft && (
            <Flex direction={{ base: 'row', md: 'column' }} align='center'>
               <IconButton
                  bg='transparent'
                  icon={<Unicorn />}
                  borderRadius='full'
                  mb={{ base: '0', md: '2' }}
                  mr={{ base: '2', md: '0' }}
                  _hover={{
                     bg: 'rgb(5 150 105 / 10%)',
                     svg: { fill: 'rgb(5 150 105)' },
                  }}
               />
               5
            </Flex>
         )}

         {!postDetail.draft && (
            <Flex direction={{ base: 'row', md: 'column' }} align='center'>
               <IconButton
                  bg='transparent'
                  icon={<Save />}
                  borderRadius='full'
                  mb={{ base: '0', md: '2' }}
                  mr={{ base: '2', md: '0' }}
                  _hover={{
                     bg: 'rgb(79 70 229 / 10%)',
                     svg: { fill: 'rgb(79 70 229)' },
                  }}
               />
               9
            </Flex>
         )}

         <Flex direction={{ base: 'row', md: 'column' }} align='center'>
            <IconButton
               bg='transparent'
               icon={<Option />}
               borderRadius='full'
               mb={{ base: '0', md: '2' }}
               mr={{ base: '2', md: '0' }}
            />
         </Flex>
      </Flex>
   );
};

export default SideReactionBar;
