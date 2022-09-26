import { calculateReaction } from './calculateTotal';

export const sortPosts = (sort, allPostData, followingTags) => {
   let currentData = [];

   const matchTag = (tags) => {
      return tags?.some((tag) => followingTags?.includes(tag.tagName)) ? 1 : -1;
   };

   switch (sort) {
      case 'latest':
         currentData = allPostData?.sort((a, b) => b.createdAt - a.createdAt);
         break;
      case 'top':
         currentData = allPostData?.sort(
            (a, b) =>
               calculateReaction(b.heart, b.unicorn, b.saved) -
               calculateReaction(a.heart, a.unicorn, a.saved)
         );
         break;
      default:
         currentData = allPostData.sort(
            (a, b) => matchTag(b.tags) - matchTag(a.tags)
         );
   }

   return currentData;
};
