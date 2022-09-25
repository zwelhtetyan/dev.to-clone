export const getLogo = (tag) => {
   if (tag.isCustomTag) {
      return '#';
   }

   if (tag.logo) {
      return tag.logo;
   }

   return `https://raw.githubusercontent.com/devicons/devicon/master/icons/${tag.tagName}/${tag.tagName}-original.svg`;
};
