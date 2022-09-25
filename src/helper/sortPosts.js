import { calculateReaction } from './calculateTotal';

export const sortPosts = (sort, allPostData) => {
   let currentData = [];

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
         currentData = allPostData;
   }

   return currentData;
};
