import { calculateReaction } from './calculateTotal';

export const getTopPostsByTag = (tagName, transformedData, currentPostId) => {
   let allPostData = [];
   if (transformedData) {
      allPostData = transformedData.filter(
         (postData) =>
            postData.id !== currentPostId &&
            !postData.draft &&
            postData.tags.length &&
            postData.tags.find((tag) => tag.tagName === tagName)
      );
   }

   const topPosts = allPostData
      ?.sort(
         (a, b) =>
            calculateReaction(b.heart, b.unicorn, b.saved) -
            calculateReaction(a.heart, a.unicorn, a.saved)
      )
      .slice(0, 3);

   return topPosts;
};
