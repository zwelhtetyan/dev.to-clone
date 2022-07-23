export const getLogo = (tag) => {
   if (tag.logo) {
      return tag.logo;
   }
   return `https://raw.githubusercontent.com/devicons/devicon/master/icons/${tag.lang}/${tag.lang}-original.svg`;
};
