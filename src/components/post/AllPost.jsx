import { Box } from '@chakra-ui/react';
import {
   collection,
   getDocs,
   onSnapshot,
   orderBy,
   query,
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import AllPostSkeletons from '../skeletons/AllPostSkeletons';
import PostItem from './PostItem';

const AllPost = () => {
   const [allPostData, setAllPostData] = useState([]);

   const getAllPosts = () => {
      const colRef = collection(db, 'posts');
      const q = query(colRef, orderBy('createdAt', 'desc'));
      onSnapshot(q, (snapshot) => {
         const newData = [];
         snapshot.docs.forEach((doc) => {
            newData.push({ ...doc.data(), id: doc.id });
         });
         setAllPostData(newData);
      });
   };

   useEffect(() => {
      getAllPosts();
   }, []);

   // const getAllPosts = async () => {
   //    const colRef = collection(db, 'posts');
   //    const q = query(colRef, orderBy('createdAt', 'desc'));
   //    const snapshot = await getDocs(q);

   //    const newData = [];
   //    snapshot.docs.forEach((doc) => {
   //       newData.push({ ...doc.data(), id: doc.id });
   //    });
   //    setAllPostData(newData);
   // };

   // useEffect(() => {
   //    getAllPosts().catch((err) => console.log(err));
   // }, []);

   console.log('all post run');

   return (
      <Box mt={{ base: '0', md: '2rem' }}>
         {allPostData.length !== 0 ? (
            allPostData.map((postData) => (
               <PostItem
                  key={postData.id}
                  id={postData.id}
                  createdAt={postData.createdAt}
                  title={postData.title}
                  tags={postData.filteredTags}
               />
            ))
         ) : (
            <>
               <AllPostSkeletons />
               <AllPostSkeletons />
               <AllPostSkeletons />
            </>
         )}
      </Box>
   );
};

export default AllPost;
