export const calcTotalDiscussion = (comments) =>
   comments.reduce(
      (count, item) => count + Object.values(item.replies).length + 1,
      0
   );
