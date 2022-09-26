import { isPrebuiltTag } from './isPrebuiltTag';

export const getPopularTags = (transformedData) => {
   let popularTags = [];

   if (transformedData) {
      const avaliableTags = [];

      transformedData.forEach(
         (postData) =>
            !postData.draft &&
            postData.tags.length &&
            avaliableTags.push(...postData.tags)
      );

      popularTags = avaliableTags.map(
         (tag) =>
            isPrebuiltTag(tag.tagName) || {
               brandColor: '#3B49DF',
               tagName: tag.tagName,
            }
      );

      // calculate number of duplicate tags
      popularTags = popularTags.map((tag, idx, arr) => {
         const count = arr.filter(
            (item) => item.tagName === tag.tagName
         ).length;

         return { ...tag, publishedPosts: count };
      });

      // remove duplicate obj from an array
      const getUniqueListBy = (arr, key) => {
         return [...new Map(arr.map((item) => [item[key], item])).values()];
      };

      popularTags = getUniqueListBy(popularTags, 'tagName').sort(
         (a, b) => b.publishedPosts - a.publishedPosts
      );
   }

   return popularTags;
};
