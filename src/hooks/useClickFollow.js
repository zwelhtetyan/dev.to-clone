import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { updateProfileData } from '../lib/api';

const useClickFollow = (profileData, userId) => {
   const [loading, setLoading] = useState(false);

   const navigate = useNavigate();

   const handleClickFollow = () => {
      if (profileData?.id === userId) {
         navigate('/customize-profile');
      } else {
         setLoading(true);
         const followers = profileData.followers || [];
         const transformedFollowers = followers.includes(userId)
            ? followers.filter((id) => id !== userId)
            : [...followers, userId];

         updateProfileData({ followers: transformedFollowers }, profileData.id)
            .then((_) => {
               setLoading(false);
               console.log('followed');
            })
            .catch((err) => {
               setLoading(false);
               console.log(err);
            });
      }
   };

   return { handleClickFollow, loading };
};

export default useClickFollow;
