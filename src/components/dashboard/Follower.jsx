import { Box } from '@chakra-ui/react';
import React from 'react';
import { useSelector } from 'react-redux';
import { useAuth } from '../../context/auth';
import Card from './Card';
import NoDataMessage from './NoDataMessage';

const Follower = () => {
   const user = useAuth();
   const { profileData } = useSelector((state) => state.profileData);

   const followerId =
      profileData
         ?.find((userData) => userData.id === user.userId)
         .followers?.map((id) => id) || [];

   const followers = profileData?.filter((userData) =>
      followerId.includes(userData.id)
   );

   if (!followers.length) {
      return <NoDataMessage title={`You don't have any followers yet.`} />;
   }

   return (
      <Box
         display='grid'
         gridTemplateColumns={{
            sm: 'repeat(2, minmax(0, 1fr))',
            lg: 'repeat(3, minmax(0, 1fr))',
         }}
         gap={{ sm: '.7rem' }}
      >
         {followers.map((userData) => (
            <Card
               key={userData.id}
               name={userData.name}
               username={userData.username}
               profile={userData.profile}
            />
         ))}
      </Box>
   );
};

export default Follower;
