import React from 'react';
import { Box, HStack, Link } from '@chakra-ui/react';
import { useAuth } from '../../context/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Hero from '../Hero';
import SideMenuItem from '../../utils/SideMenuItem';
import TagMenu from './TagMenu';
import {
   aboutIcon,
   contactIcon,
   tagIcon,
   homeIcon,
   readingListIcon,
   FAQIcon,
} from '../../assets/icons';
import { SecondaryBtn } from '../../utils/Buttons';
import {
   GrFacebook,
   GrGithub,
   GrInstagram,
   GrLinkedin,
   GrTwitter,
} from 'react-icons/gr';

const SocialLinkIcon = ({ children, href }) => {
   return (
      <Link href={href} target='_blank'>
         <SecondaryBtn>{children}</SecondaryBtn>
      </Link>
   );
};

const Menu = ({ onClose, heroPadding }) => {
   const user = useAuth();
   const navigate = useNavigate();
   const location = useLocation();

   const { transformedData } = useSelector((state) => state.transformedData);

   let savedPosts = [];
   if (transformedData) {
      savedPosts = transformedData.filter(
         (postItem) =>
            postItem.saved?.includes(user?.userId) &&
            !postItem.archived?.includes(user?.userId)
      );
   }

   const handleClickHome = () => {
      onClose && onClose();

      if (location.pathname !== '/') {
         navigate('/');
      }

      window.scrollTo(0, 0);
   };

   const handleClickMenu = (route) => {
      onClose && onClose();
      navigate(`/${route}`);
   };

   return (
      <Box>
         {!user && (
            <Box
               boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
               borderRadius='5px'
               mb='.7rem'
            >
               <Hero
                  btnWidth='90%'
                  onClose={onClose ? onClose : () => {}}
                  p={heroPadding}
               />
            </Box>
         )}

         <SideMenuItem icon={homeIcon} title='Home' onClick={handleClickHome} />

         {user && (
            <SideMenuItem
               icon={readingListIcon}
               savedPostsCount={savedPosts.length}
               title='Reading List'
               onClick={() => handleClickMenu('readinglist')}
            />
         )}

         <SideMenuItem
            icon={tagIcon}
            title='Tags'
            onClick={() => handleClickMenu('tags')}
         />

         <SideMenuItem
            icon={FAQIcon}
            title='FAQ'
            onClick={() => handleClickMenu('faq')}
         />

         <SideMenuItem
            icon={contactIcon}
            title='Contact'
            onClick={() => handleClickMenu('contact')}
         />

         <SideMenuItem
            icon={aboutIcon}
            title='About'
            onClick={() => handleClickMenu('about')}
         />

         <HStack justify='' my='3' color='rgb(64 64 64)'>
            <SocialLinkIcon href='https://twitter.com/zwelHtetYan2'>
               <GrTwitter size={22} />
            </SocialLinkIcon>

            <SocialLinkIcon href='https://www.facebook.com/zwel.h.yan/'>
               <GrFacebook size={20} />
            </SocialLinkIcon>

            <SocialLinkIcon href='https://github.com/zwelhtetyan'>
               <GrGithub size={23} />
            </SocialLinkIcon>

            <SocialLinkIcon href='https://www.instagram.com/zwel.h.y/'>
               <GrInstagram size={20} />
            </SocialLinkIcon>

            <SocialLinkIcon href='https://www.linkedin.com/in/zwelhtetyan/ '>
               <GrLinkedin size={20} />
            </SocialLinkIcon>
         </HStack>

         {/* tags */}
         <TagMenu userId={user?.userId} onClose={onClose} />
      </Box>
   );
};

export default Menu;
