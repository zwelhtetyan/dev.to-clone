export const checkUsername = (username, authenticatedUsernames) => {
   //  Usernames can only have:
   //   - Lowercase Letters (a-z)
   //   - Numbers (0-9)
   //   - Dots (.)
   //   - Underscores (_)

   const res = /^[a-z0-9_.]+$/.exec(username.toLowerCase());
   const valid = !!res; //!! operator converts an Object to Boolean

   if (authenticatedUsernames.includes(username.toLowerCase())) {
      return 'username is already taken';
   } else if (!valid) {
      return 'invalid username';
   } else {
      return 'valid';
   }
};
