import React, { useRef } from 'react';
import { Edior, Footer, Header, Title } from '../styles/CreatePostStyles';
import MainContentWrapper from '../utils/MainContentWrapper';
import logo from '../assets/logo/logo.png';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import { VscClose } from 'react-icons/vsc';
import MDE from '../components/MDE';
import { useNavigate } from 'react-router-dom';
import AddLangTag from '../components/LangTag/AddLangTag';
import { useSelector } from 'react-redux';
import AddCvImg from '../components/AddCvImg';

const CreatePost = () => {
   //scroll top
   window.scrollTo(0, 0);

   //redux store
   const publicPost = useSelector((state) => state.publicPost);

   //state
   const postTitleRef = useRef();

   const navigate = useNavigate();

   const publishPostHandler = () => {
      console.log(publicPost.cvImgUrl);
      console.log(postTitleRef.current.value);
      console.log(publicPost.filteredTags);
      console.log(publicPost.MDEValue);
   };

   return (
      <MainContentWrapper>
         <Header>
            <div>
               <img src={logo} alt='' />
               <h3>Create Post</h3>
            </div>
            <SecondaryBtn className='search-icon' onClick={() => navigate('/')}>
               <VscClose size={23} />
            </SecondaryBtn>
         </Header>

         <Edior>
            <AddCvImg />

            <Title placeholder='New post title here...' ref={postTitleRef} />

            <AddLangTag />

            <MDE />

            <Footer>
               <SecondaryBtn w={'100px'} margin='0 0.5rem 0 0'>
                  Save Draft
               </SecondaryBtn>
               <PrimaryBtn
                  w={'100px'}
                  bg='rgb(59 73 223)'
                  color='#fff'
                  onClick={publishPostHandler}
               >
                  Publish
               </PrimaryBtn>
            </Footer>
         </Edior>
      </MainContentWrapper>
   );
};

export default CreatePost;
