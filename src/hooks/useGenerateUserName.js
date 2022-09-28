import { useSelector } from 'react-redux';

const useGenerateUserName = () => {
   const { profileData } = useSelector((state) => state.profileData);

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

         createUniqueUsername(nameParam, +number + 1);
      };

      createUniqueUsername(username.toLowerCase().split(' ').join(''));

      return uinqueUsername;
   };

   return getUsername;
};

export default useGenerateUserName;
