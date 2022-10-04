import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DetailElements from '../components/detail/DetailElements';
import { getPopularTags } from '../helper/getPopularTags';
import { getTopPostsByTag } from '../helper/getTopPostsByTag';

const PostDetails = () => {
   const { title } = useParams();
   const navigate = useNavigate();

   // get postId from (title + postId)
   const param = title.split('_');
   const postId = param[param.length - 1];

   const {
      transformedData,
      transformedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   const profileData = useSelector((state) => state.profileData.profileData);

   const postDetail = transformedData?.find(
      (postData) => postData.id === postId
   );

   const currentUserProfile = profileData?.find(
      (data) => data.id === postDetail?.userId
   );

   const otherPosts = transformedData
      ?.filter(
         (postData) =>
            postData.userId === currentUserProfile?.id &&
            postData.id !== postId &&
            !postData.draft
      )
      .sort((a, b) => (b.heart?.length || 0) - (a.heart?.length || 0))
      .slice(0, 3); // get just 3 most reaction post

   const [popularTags] = getPopularTags(transformedData)
      .map((tag) => tag.tagName)
      .slice(0, 1); // get just top one tag

   //to preview images
   useEffect(() => {
      if (postDetail) {
         const imgfilteredTags = [
            ...document.querySelectorAll('.mde-preview-content p img'),
         ];

         imgfilteredTags.forEach((img) => {
            img.style.cursor = 'zoom-in';

            img.addEventListener('click', () =>
               navigate(`/preview/${encodeURIComponent(img.src)}`)
            );
         });
      }
   }, [postDetail, navigate, title]);

   return (
      <DetailElements
         postDetail={postDetail}
         loading={loading}
         err={err}
         currentUserProfile={currentUserProfile}
         otherPosts={otherPosts}
         trandingOnDevCommunity={getTopPostsByTag(
            popularTags,
            transformedData,
            postId
         )}
      />
   );
};

export default PostDetails;
