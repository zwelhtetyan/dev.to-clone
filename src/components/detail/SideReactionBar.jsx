import { Flex, IconButton, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import useClickReactToPost from '../../hooks/useClickReactToPost';
import { useAuth } from '../../context/auth';
import MoreOptionMenu from './MoreOptionMenu';
import {
   Heart,
   AlreadyHearted,
   Unicorn,
   AlreadyUnicorned,
   Save,
   AlreadySaved,
} from '../../assets/icons';

const styles = {
   direction: { base: 'row', md: 'column' },
   align: 'center',
   fontSize: '15px',
   cursor: 'pointer',
};

const iconStyles = {
   bg: 'transparent',
   borderRadius: 'full',
   mb: { base: '0', md: '2' },
   mr: { base: '2', md: '0' },
};

const SideReactionBar = ({ postDetail }) => {
   const user = useAuth();

   const { clickReactHandler: clickHeart, updatingReact: updatingHeart } =
      useClickReactToPost(postDetail.heart, postDetail.id, 'heart');

   const { clickReactHandler: clickUnicorn, updatingReact: updatingUnicorn } =
      useClickReactToPost(postDetail.unicorn, postDetail.id, 'unicorn');

   const { clickReactHandler: clickSave, updatingReact: updatingSave } =
      useClickReactToPost(postDetail.saved, postDetail.id, 'saved');

   const alreadyHeart = postDetail.heart?.includes(user?.userId);
   const alreadyUnicorned = postDetail.unicorn?.includes(user?.userId);
   const alreadySaved = postDetail.saved?.includes(user?.userId);

   const totalHeart = postDetail.heart?.length || 0;
   const totalUnicorn = postDetail.unicorn?.length || 0;
   const totalSaved = postDetail.saved?.length || 0;

   const reactionIconColor = useColorModeValue('#3d3d3d', '#d6d6d7');
   const bg = useColorModeValue('rgb(255, 255, 255)', 'rgb(0, 0, 0)');

   return (
      <Flex
         bg={{ base: bg, md: 'transparent' }}
         boxShadow={{ base: '0 -1px 5px rgba(0,0,0,0.2)', md: 'none' }}
         height={{ base: '3.5rem', md: 'auto' }}
         width={{ base: '100vw', md: '50px' }}
         position={{ base: 'fixed', md: 'sticky' }}
         bottom={{ base: '0', md: 'unset' }}
         left='0'
         top={{ base: 'unset', md: '6rem' }}
         zIndex='2'
         direction={{ base: 'row', md: 'column' }}
         align='center'
         justify={{ base: 'space-around', md: 'flex-start' }}
         gap='1rem'
         me='1rem'
      >
         {!postDetail.draft && (
            <Flex
               {...styles}
               onClick={clickHeart}
               color={alreadyHeart && 'rgb(220 38 38)'}
            >
               <IconButton
                  disabled={updatingHeart}
                  icon={
                     alreadyHeart ? (
                        <AlreadyHearted />
                     ) : (
                        <Heart fill={reactionIconColor} />
                     )
                  }
                  {...iconStyles}
                  border={alreadyHeart && '2px solid rgb(220 38 38)'}
                  bg={alreadyHeart ? 'rgb(220 38 38 / 10%)' : 'transparent'}
                  _hover={{
                     bg: 'rgb(220 38 38 / 10%)',
                     svg: { fill: 'rgb(220 38 38)' },
                  }}
               />
               {totalHeart}
            </Flex>
         )}

         {!postDetail.draft && (
            <Flex
               {...styles}
               onClick={clickUnicorn}
               color={alreadyUnicorned && 'rgb(5 150 105)'}
            >
               <IconButton
                  disabled={updatingUnicorn}
                  icon={
                     alreadyUnicorned ? (
                        <AlreadyUnicorned />
                     ) : (
                        <Unicorn fill={reactionIconColor} />
                     )
                  }
                  {...iconStyles}
                  border={alreadyUnicorned && '2px solid rgb(5 150 105)'}
                  bg={alreadyUnicorned ? 'rgb(5 150 105 / 10%)' : 'transparent'}
                  _hover={{
                     bg: 'rgb(5 150 105 / 10%)',
                     svg: { fill: 'rgb(5 150 105)' },
                  }}
               />
               {totalUnicorn}
            </Flex>
         )}

         {!postDetail.draft && (
            <Flex
               {...styles}
               onClick={clickSave}
               color={alreadySaved && 'rgb(79 70 229)'}
            >
               <IconButton
                  disabled={updatingSave}
                  icon={
                     alreadySaved ? (
                        <AlreadySaved />
                     ) : (
                        <Save fill={reactionIconColor} />
                     )
                  }
                  {...iconStyles}
                  border={alreadySaved && '2px solid rgb(79 70 229)'}
                  bg={alreadySaved ? 'rgb(79 70 229 / 10%)' : 'transparent'}
                  _hover={{
                     bg: 'rgb(79 70 229 / 10%)',
                     svg: { fill: 'rgb(79 70 229)' },
                  }}
               />
               {totalSaved}
            </Flex>
         )}

         <Flex direction={{ base: 'row', md: 'column' }} align='center'>
            <MoreOptionMenu
               iconStyles={iconStyles}
               postTitle={postDetail.title}
               reactionIconColor={reactionIconColor}
            />
         </Flex>
      </Flex>
   );
};

export default SideReactionBar;
