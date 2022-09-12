import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import Card from './Card';
import NoDataMessage from './NoDataMessage';

const FollowingUser = () => {
   const user = useAuth();
   const { profileData } = useSelector((state) => state.profileData);

   const followingUsers = profileData.filter((userData) =>
      userData.followers?.includes(user.userId)
   );

   if (!followingUsers.length) {
      return <NoDataMessage title={`You don't follow any users`} />;
   }

   return (
      <Box
         display='grid'
         gridTemplateColumns={{ sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
         gap={{ sm: '.7rem' }}
      >
         {followingUsers.map((userData) => (
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

export default FollowingUser;
