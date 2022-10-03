import { useSelector } from 'react-redux';

const useGenerateUserName = () => {
   const { profileData } = useSelector((state) => state.profileData);

   const getRandomNumber = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
   };

   const getUsername = (username, userId) => {
      const authenticatedUsernames = [
         ...new Set(
            profileData
               ?.filter(
                  (userData) =>
                     userData.id !== userId &&
                     userData.username?.toLowerCase().split(' ').join('')
               )
               .map((data) => data.username)
         ),
      ];

      let uinqueUsername = '';

      //recusive func
      const createUniqueUsername = (nameParam, number = '') => {
         const name = nameParam + number;

         if (!authenticatedUsernames.includes(name)) {
            uinqueUsername = name;
            return;
         }

         createUniqueUsername(nameParam, getRandomNumber(1, 999));
      };

      createUniqueUsername(username.toLowerCase().split(' ').join(''));

      return uinqueUsername;
   };

   return getUsername;
};

export default useGenerateUserName;
