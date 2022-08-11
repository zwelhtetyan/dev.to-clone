import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPostData } from '../store/post/currentPost';
import DetailElements from '../components/post/DetailElements';
import '../styles/postdetail.scss';

const PostDetails = () => {
   const { id } = useParams();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   const postDetail = transformedData?.find((item) => item.id === id);

   console.log(postDetail);

   useEffect(() => {
      if (postDetail) {
         dispatch(
            setCurrentPostData({
               cvImg: postDetail.cvImg,
               title: postDetail.title,
               filteredTags: postDetail.filteredTags,
               MDEValue: postDetail.MDEValue,
               id,
            })
         );
      }
   }, [postDetail, dispatch, id]);

   //to preview images
   useEffect(() => {
      if (postDetail) {
         const imgTags = [
            ...document.querySelectorAll('.display_MDEValue p img'),
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
         pramId={id}
      />
   );
};

export default PostDetails;
