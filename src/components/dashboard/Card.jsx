import { Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Card = ({ profile, name, username }) => {
   const navigate = useNavigate();

   const handleViewProfile = () => {
      navigate(`/${username}`);
   };

   return (
      <Flex
         bg='white'
         w='100%'
         boxShadow='0 0 0 1px rgba(23, 23, 23, .1)'
         p={{ base: '.5rem', sm: '1rem', lg: '1.5rem' }}
         borderRadius='5px'
         align='center'
         direction={{ base: 'row', sm: 'column' }}
      >
         <Image
            src={profile}
            alt='profile'
            boxSize={{ base: '50px', sm: '64px' }}
            objectFit='cover'
            rounded='full'
            mb={{ sm: '.5rem' }}
            mr={{ base: '.5rem', sm: '0' }}
            cursor='pointer'
            onClick={handleViewProfile}
         />
         <Heading
            fontSize='1.2rem'
            color='rgb(47 58 178)'
            cursor='pointer'
            onClick={handleViewProfile}
         >
            {name}
         </Heading>
      </Flex>
   );
};

export default Card;
