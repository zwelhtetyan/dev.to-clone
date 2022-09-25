import tagData from '../pages/tags/tagData.json';

export const isPrebuiltTag = (tagName) =>
   tagData.find((tagData) => tagData.tagName === tagName);
