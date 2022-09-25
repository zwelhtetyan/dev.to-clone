import { Box } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import SideMenuItem from '../../utils/SideMenuItem';
import Hero from '../Hero';
import HomeIcon from '../../assets/icons/HomeIcon.svg';
import ReadingListIcon from '../../assets/icons/ReadingListIcon.svg';
import FAQIcon from '../../assets/icons/FAQIcon.svg';
import AboutIcon from '../../assets/icons/AboutIcon.svg';
import ContactIcon from '../../assets/icons/ContactIcon.svg';
import TagIcon from '../../assets/icons/TagIcon.svg';

const HomeMenu = ({ transformedData, loading, err }) => {
   const user = useAuth();
   const navigate = useNavigate();
   const [clickHome, setClickHome] = useState(false);

   useEffect((_) => window.scrollTo(0, 0), [clickHome]);

   let savedPosts = [];
   if (transformedData && !loading && !err) {
      savedPosts = transformedData.filter(
         (postItem) =>
            postItem.saved?.includes(user?.userId) &&
            !postItem.archived?.includes(user?.userId)
      );
   }

   const handleClickHome = () => {
      setClickHome((prev) => !prev);
   };

   return (
      <Box
         flex='1'
         pe='1rem'
         pos='sticky'
         top='4rem'
         maxW='280px'
         display={{ base: 'none', md: 'block' }}
      >
         {!user && (
            <Box
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               borderRadius='5px'
               mb='.7rem'
            >
               <Hero btnWidth='90%' p='.7rem' onClose={() => {}} />
            </Box>
         )}

         <SideMenuItem icon={HomeIcon} title='Home' onClick={handleClickHome} />

         {user && (
            <SideMenuItem
               icon={ReadingListIcon}
               title='Reading List'
               savedPostsCount={savedPosts.length}
               onClick={() => navigate('/readinglist')}
            />
         )}

         <SideMenuItem
            icon={TagIcon}
            title='Tags'
            onClick={() => navigate('/tags')}
         />

         <SideMenuItem
            icon={FAQIcon}
            title='FAQ'
            onClick={() => navigate('/faq')}
         />

         <SideMenuItem
            icon={ContactIcon}
            title='Contact'
            onClick={() => navigate('/contact')}
         />

         <SideMenuItem
            icon={AboutIcon}
            title='About'
            onClick={() => navigate('/about')}
         />
      </Box>
   );
};

export default HomeMenu;
