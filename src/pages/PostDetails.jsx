import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DetailElements from '../components/post/DetailElements';
import '../styles/postdetail.scss';

const PostDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   const postDetail = transformedData?.find((postData) => postData.id === id);

   //to preview images
   useEffect(() => {
      if (postDetail) {
         const imgTags = [
            ...document.querySelectorAll('.mde-preview-content p img'),
         ];

         imgTags.forEach((img) => {
            img.style.cursor = 'zoom-in';

            img.addEventListener('click', () =>
               navigate(`/preview/${encodeURIComponent(img.src)}`)
            );
         });
      }
   }, [postDetail, navigate, id]);

   console.log('post detail run');

   return (
      <DetailElements
         postDetail={postDetail}
         loading={loading}
         err={err}
         postId={id}
      />
   );
};

export default PostDetails;
