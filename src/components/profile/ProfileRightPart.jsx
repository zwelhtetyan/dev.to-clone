import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';
import { useAuth } from '../../context/auth';
import {
   calcTotalDiscussion,
   calculateReaction,
} from '../../helper/calculateTotal';
import PostItem from '../post/PostItem';
import { BsFillPinAngleFill } from 'react-icons/bs';

const ProfileRightPart = ({ pinnedPosts, otherPosts }) => {
   const user = useAuth();
   const userId = user?.userId;

   return (
      <Box flex={{ base: 'unset', md: '2' }} borderRadius='5px' w='100%'>
         {pinnedPosts && pinnedPosts.length !== 0 && (
            <Box
               border='2px solid rgb(59 73 223)'
               borderRadius='5px'
               mb='.5rem'
               p={{ base: '.7rem .7rem .3rem', md: '1rem 1rem .5rem' }}
            >
               <Box as='header'>
                  <Button
                     bg='light.primary'
                     _hover={{ bg: 'light.primary' }}
                     m={{ base: '-2rem 0 0 0', md: '-2.5rem 0 0' }}
                     _active={{ bg: 'light.primary' }}
                     cursor='default'
                     color='dark.color'
                  >
                     <BsFillPinAngleFill size={19} />
                     <Text fontWeight={700} ms='.5rem'>
                        Pinned
                     </Text>
                  </Button>
               </Box>

               {pinnedPosts.map((postData) => (
                  <PostItem
                     key={postData.id}
                     name={postData.name}
                     username={postData.username}
                     profile={postData.profile}
                     id={postData.id}
                     createdAt={postData.createdAt}
                     title={postData.title}
                     tags={postData.tags}
                     readTime={postData.readTime}
                     isUpdated={postData?.updated}
                     userId={postData.userId}
                     currentUserId={userId} // authenticated userId
                     totalDiscussion={calcTotalDiscussion(postData.comments)}
                     totalReaction={calculateReaction(
                        postData.heart,
                        postData.unicorn,
                        postData.saved
                     )}
                     saved={postData.saved}
                     alreadySaved={postData.saved?.includes(userId)}
                     baseRadius='5px'
                  />
               ))}
            </Box>
         )}

         {otherPosts &&
            otherPosts.map((postData) => (
               <PostItem
                  key={postData.id}
                  name={postData.name}
                  username={postData.username}
                  profile={postData.profile}
                  id={postData.id}
                  createdAt={postData.createdAt}
                  title={postData.title}
                  tags={postData.tags}
                  readTime={postData.readTime}
                  isUpdated={postData?.updated}
                  userId={postData.userId}
                  currentUserId={userId} // authenticated userId
                  totalDiscussion={calcTotalDiscussion(postData.comments)}
                  totalReaction={calculateReaction(
                     postData.heart,
                     postData.unicorn,
                     postData.saved
                  )}
                  saved={postData.saved}
                  alreadySaved={postData.saved?.includes(userId)}
               />
            ))}
      </Box>
   );
};

export default ProfileRightPart;
