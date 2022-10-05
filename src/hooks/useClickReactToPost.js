import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../context/auth';
import { updatePostReaction } from '../lib/api';
import { setLoginAlert } from '../store/loginAlert';

const useClickReactToPost = (reactionArr, postId, reactType) => {
   const user = useAuth();
   const dispatch = useDispatch();
   const [updatingReact, setUpdatingReact] = useState(false);

   const clickReactHandler = () => {
      if (!user?.userId) {
         dispatch(setLoginAlert(true));
         return;
      }

      setUpdatingReact(true);

      const prevReactionArr = reactionArr || [];
      const userId = user.userId;

      const transformedReact = prevReactionArr.includes(userId)
         ? prevReactionArr.filter((id) => id !== userId)
         : [...prevReactionArr, userId];

      updatePostReaction({ [reactType]: transformedReact }, postId)
         .then((_) => {
            setUpdatingReact(false);

            // console.log('react added successfully');
         })
         .catch((err) => {
            setUpdatingReact(false);

            console.log(err);
         });
   };

   return { clickReactHandler, updatingReact };
};

export default useClickReactToPost;
