import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import Card from './Card';

const Follower = () => {
   const user = useAuth();
   const { profileData } = useSelector((state) => state.profileData);

   const followerId =
      profileData
         .find((userData) => userData.id === user.userId)
         .followers?.map((id) => id) || [];

   const followers = profileData.filter((userData) =>
      followerId.includes(userData.id)
   );

   return (
      <Box
         display='grid'
         gridTemplateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
         gap={{ sm: '.7rem' }}
      >
         {followers.map((userData) => (
            <Card
               key={userData.id}
               userId={userData.id}
               profile={userData.profile}
               name={userData.name}
            />
         ))}
      </Box>
   );
};

export default Follower;
