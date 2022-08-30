import { Box, Flex } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import AllPost from '../components/post/AllPost';
import { useAuth } from '../context/auth';
import SideMenuItem from '../utils/SideMenuItem';
import HomeIcon from '../assets/logo/HomeIcon.svg';
import ReadingListIcon from '../assets/logo/ReadingListIcon.svg';
import FAQIcon from '../assets/logo/FAQIcon.svg';
import { useState } from 'react';
import { useSelector } from 'react-redux';

const Home = () => {
   const user = useAuth();
   const [clickHome, setClickHome] = useState(false);

   useEffect((_) => window.scrollTo(0, 0), [clickHome]);

   const {
      transformedData,
      transfromedDataLoading: loading,
      transformedDataErr: err,
   } = useSelector((state) => state.transformedData);

   let savedPosts = [];
   if (transformedData && !loading && !err) {
      savedPosts = transformedData.filter((postItem) =>
         postItem.saved?.includes(user.userId)
      );
   }

   const handleClickHome = () => {
      setClickHome((prev) => !prev);
   };

   return (
      <Flex
         px={{ base: '0', md: '1rem' }}
         maxW='1200px'
         w='100%'
         pos='relative'
         align='flex-start'
         flex='1'
      >
         {/* home menu */}
         <Box
            flex='1'
            pe='1rem'
            pos='sticky'
            top='4rem'
            maxW='300px'
            display={{ base: 'none', md: 'block' }}
         >
            <SideMenuItem
               icon={HomeIcon}
               title='Home'
               onClick={handleClickHome}
            />
            {user && (
               <SideMenuItem
                  icon={ReadingListIcon}
                  title='Reading List'
                  savedPosts={savedPosts.length}
               />
            )}
            <SideMenuItem icon={FAQIcon} title='FAQ' />
         </Box>

         {/* all post */}
         <AllPost
            transformedData={transformedData}
            loading={loading}
            err={err}
         />
      </Flex>
   );
};

export default Home;
