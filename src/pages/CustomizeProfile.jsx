import React, { useRef, useState } from 'react';
import { Box, Heading, Spinner, Text } from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { PrimaryBtn } from '../utils/Buttons';
import { whiteBoxStyles } from '../utils/CustomizeProfileStyles';
import Basic from '../components/profile/customizeProfile/Basic';
import Work from '../components/profile/customizeProfile/Work';
import Branding from '../components/profile/customizeProfile/Branding';
import User from '../components/profile/customizeProfile/User';
import Coding from '../components/profile/customizeProfile/Coding';
import { removeImage, updateProfileData } from '../lib/api';
import { useSelector } from 'react-redux';
import { getAuth, updateProfile } from 'firebase/auth';
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadString,
} from 'firebase/storage';
import { nanoid } from 'nanoid';
import ErrorMessage from '../utils/ErrorMessage';
import CustomizeProfileSkeleton from '../components/skeletons/CustomizeProfileSkeleton';

const CustomizeProfile = () => {
   const user = useAuth();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const auth = getAuth();

   const { profileData, profileDataLoading, profileDataErr } = useSelector(
      (state) => state.profileData
   );

   const nameRef = useRef();
   const emailRef = useRef();
   const websiteRef = useRef();
   const githubRef = useRef();
   const twitterRef = useRef();
   const locationRef = useRef();
   const bioRef = useRef();
   const learningRef = useRef();
   const skillRef = useRef();
   const hackingRef = useRef();
   const avaliableRef = useRef();
   const workRef = useRef();
   const educationRef = useRef();
   const backgroundRef = useRef();
   const previewImgRef = useRef();

   let currentUserProfile = null;
   if (profileData) {
      currentUserProfile = profileData.find((data) => data.id === user.userId);
   }

   if (profileDataLoading) {
      return <CustomizeProfileSkeleton />;
   }

   if (!profileData && !profileDataLoading && profileDataErr) {
      return <ErrorMessage offline={true} />;
   }

   if (!user) {
      return <Navigate to='/login' />;
   }

   const storage = getStorage();
   const storageRef = ref(storage, `profiles/photo${nanoid()}`);

   const updateProfileHandler = (e) => {
      e.preventDefault();

      const name = nameRef.current.value;
      const email = emailRef.current.value;
      const website = websiteRef.current.value;
      const github = githubRef.current.value;
      const twitter = twitterRef.current.value;
      const location = locationRef.current.value;
      const bio = bioRef.current.value;
      const learning = learningRef.current.value;
      const skills = skillRef.current.value;
      const hacking = hackingRef.current.value;
      const avaliable = avaliableRef.current.value;
      const work = workRef.current.value;
      const education = educationRef.current.value;
      const background = backgroundRef.current.value;
      const previewImg = previewImgRef.current.title;

      const newData = {
         name,
         email,
         website,
         github,
         twitter,
         location,
         bio,
         learning,
         skills,
         hacking,
         avaliable,
         work,
         education,
         background,
      };

      setLoading(true);

      if (name) {
         updateProfile(auth.currentUser, {
            displayName: name,
         });
      }

      if (previewImg) {
         uploadString(storageRef, previewImg, 'data_url').then((_) => {
            getDownloadURL(storageRef).then((url) => {
               updateProfileData(
                  { ...newData, profile: url },
                  user.userId
               ).then((_) => {
                  setLoading(false);
                  navigate(`/profile/${user.userId}`);
                  console.log('prifile informations are updated');
               });

               updateProfile(auth.currentUser, { photoURL: url });
            });
         });
         return;
      }

      updateProfileData(newData, user.userId).then((_) => {
         setLoading(false);
         navigate(`/profile/${user.userId}`);
         console.log('prifile informations are updated');
      });
   };

   const removeProfileImgHandler = (url) => {
      setLoading(true);

      removeImage(url);
      updateProfileData({ profile: '' }, user.userId).then((_) => {
         setLoading(false);
         navigate(`/profile/${user.userId}`);
         console.log('prifile informations are updated');
      });
   };

   return (
      <Box maxW='1000px' mx='auto' mt='1rem' px='.5rem'>
         <Heading fontSize={{ base: '1.3rem', md: '1.5rem' }}>
            Profile for{' '}
            <Text color='rgb(59 73 223)' as='span'>
               @{currentUserProfile?.name} 🤓
            </Text>
         </Heading>

         {/* form */}
         <Box
            as='form'
            maxW='720px'
            mx='auto'
            mt='1rem'
            onSubmit={updateProfileHandler}
         >
            <User
               nameRef={nameRef}
               emailRef={emailRef}
               profileData={currentUserProfile}
               previewImgRef={previewImgRef}
               removeProfileImgHandler={removeProfileImgHandler}
            />

            <Basic
               websiteRef={websiteRef}
               githubRef={githubRef}
               twitterRef={twitterRef}
               locationRef={locationRef}
               bioRef={bioRef}
               profileData={currentUserProfile}
            />

            <Coding
               learningRef={learningRef}
               skillRef={skillRef}
               hackingRef={hackingRef}
               avaliableRef={avaliableRef}
               profileData={currentUserProfile}
            />

            <Work
               workRef={workRef}
               educationRef={educationRef}
               profileData={currentUserProfile}
            />

            <Branding
               backgroundRef={backgroundRef}
               profileData={currentUserProfile}
            />

            <Box {...whiteBoxStyles} pb='1rem'>
               <PrimaryBtn
                  bg='rgb(59 73 223)'
                  w='100%'
                  disabled={loading}
                  type='submit'
               >
                  {loading && <Spinner size='sm' mr={3} />}
                  {loading ? 'Updationg' : 'Update'} Profile Information.
               </PrimaryBtn>
            </Box>
         </Box>
      </Box>
   );
};

export default CustomizeProfile;
