export const getUserProfileData = (profileData, userId) => {
   return profileData.find((data) => data.id === userId);
};
