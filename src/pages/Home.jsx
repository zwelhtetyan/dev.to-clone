import React from 'react';
import Hero from '../components/Hero';
import AllPost from '../components/post/AllPost';
import MainContentWrapper from '../utils/MainContentWrapper';

const Home = () => {
   return (
      <MainContentWrapper pt='3rem'>
         <Hero />
         <AllPost />
      </MainContentWrapper>
   );
};

export default Home;
