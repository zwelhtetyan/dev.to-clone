import {
   deleteObject,
   getDownloadURL,
   ref,
   uploadBytes,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { storage } from '../firebase';
import { setCvImgUrl } from '../store/publishPost';
import { ImgUpload, Wrapper } from '../styles/AddCvImgStyles';
import { SecondaryBtn } from '../utils/Buttons';
import Spinner from './Spinner';

const AddCvImg = () => {
   //states
   const [cvImg, setCvImg] = useState({
      url: null,
      path: null,
   });

   const [uploading, setUploading] = useState(false);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setCvImgUrl(cvImg.url));
   }, [cvImg.url, dispatch]);

   const handleCVImageUpload = (e) => {
      const image = e.target.files[0];
      if (image) {
         cvImg.path && handleCVImgRemove(cvImg.path);
         const sendRequest = async () => {
            setUploading(true);
            const selectedImgPath = `images/${image.name}${nanoid()}`;
            const cvImgRef = ref(storage, selectedImgPath);
            await uploadBytes(cvImgRef, image);

            const url = await getDownloadURL(cvImgRef);
            setUploading(false);
            setCvImg({ url, path: selectedImgPath });
         };

         sendRequest().catch((err) => console.log(err));
      }
   };

   const handleCVImgRemove = (path) => {
      const desertRef = ref(storage, path);
      deleteObject(desertRef)
         .then((res) => {
            setCvImg({ url: null, path: null });
            console.log('removed');
         })
         .catch((err) => console.log(err));
   };

   return (
      <Wrapper>
         {uploading && <Spinner msg={'Uploading'} />}
         {!uploading && cvImg.url && <img src={cvImg.url} alt='cover_image' />}
         {!uploading && (
            <div>
               <ImgUpload>
                  <input
                     type='file'
                     accept='image/jpeg, image/png, image/jpg , image/webp'
                     onChange={handleCVImageUpload}
                  />
                  {cvImg.url ? 'change' : 'Add a cover image'}
               </ImgUpload>
               {cvImg.url && (
                  <SecondaryBtn
                     color='red'
                     hoverColor='red'
                     onClick={() => handleCVImgRemove(cvImg.path)}
                  >
                     Remove
                  </SecondaryBtn>
               )}
            </div>
         )}
      </Wrapper>
   );
};

export default AddCvImg;
