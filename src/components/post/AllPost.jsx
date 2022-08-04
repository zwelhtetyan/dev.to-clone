import { Box } from '@chakra-ui/react';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../config/firebase';
import AllPostSkeletons from '../skeletons/AllPostSkeletons';
import PostItem from './PostItem';

const AllPost = () => {
   const [allPostData, setAllPostData] = useState([]);
   const [loading, setLoading] = useState(false);

   const getAllPosts = () => {
      setLoading(true);
      const colRef = collection(db, 'posts');
      const q = query(colRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, { includeMetadataChanges: true }, (snapshot) => {
         if (!snapshot.metadata.hasPendingWrites) {
            const newData = [];
            snapshot.docs.forEach((doc) => {
               newData.push({ ...doc.data(), id: doc.id });
            });
            setAllPostData(newData);
            setLoading(false);
         }
      });
   };

   useEffect(() => {
      getAllPosts();
   }, []);

   console.log('all post run');

   return (
      <Box mt={{ base: '0', md: '2rem' }}>
         {loading && (
            <>
               <AllPostSkeletons />
               <AllPostSkeletons />
               <AllPostSkeletons />
            </>
         )}

         {allPostData.length !== 0 &&
            !loading &&
            allPostData.map((postData) => (
               <PostItem
                  key={postData.id}
                  id={postData.id}
                  createdAt={postData.createdAt}
                  title={postData.title}
                  tags={postData.filteredTags}
                  readTime={postData.readTime}
               />
            ))}
      </Box>
   );
};

export default AllPost;
