import React, { useRef, useState } from 'react';
import {
   Box,
   Heading,
   Spinner,
   Text,
   useColorModeValue,
} from '@chakra-ui/react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { PrimaryBtn } from '../utils/Buttons';
import { CustomizeProfileCard } from '../utils/CustomizeProfileStyles';
import {
   Basic,
   Work,
   Branding,
   User,
   Coding,
} from '../components/profile/customizeProfile';
import { removeImage, updateProfileData } from '../lib/api';
import { useSelector } from 'react-redux';
import { getAuth, updateProfile } from 'firebase/auth';
import {
   getDownloadURL,
   getStorage,
   ref,
   uploadString,
} from 'firebase/storage';
import { nanoid } from '@reduxjs/toolkit';
import ErrorMessage from '../utils/ErrorMessage';
import CustomizeProfileSkeleton from '../components/skeletons/CustomizeProfileSkeleton';
import { useEffect } from 'react';
import { checkUsername } from '../helper/checkUsername';

const CustomizeProfile = () => {
   //scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   const user = useAuth();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);
   const auth = getAuth();

   const { profileData, profileDataLoading, profileDataErr } = useSelector(
      (state) => state.profileData
   );

   const nameRef = useRef();
   const usernameRef = useRef();
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

   const nameColor = useColorModeValue('light.primary', 'dark.primary');

   if (!user) {
      return <Navigate to='/create-account' replace />;
   }

   let currentUserProfile = null;
   let authenticatedUsernames = [];
   if (profileData) {
      currentUserProfile = profileData.find((data) => data.id === user.userId);

      authenticatedUsernames = profileData
         .filter((userData) => userData.id !== user.userId)
         .map((data) => data.username);
   }

   if (profileDataLoading) {
      return <CustomizeProfileSkeleton />;
   }

   if (!profileData && !profileDataLoading && profileDataErr) {
      return <ErrorMessage offline={true} />;
   }

   const storage = getStorage();
   const storageRef = ref(storage, `profiles/photo${nanoid()}`);

   const updateProfileHandler = (e) => {
      e.preventDefault();

      const name = nameRef.current.value;
      const username = usernameRef.current.value;
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
         username,
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

      if (checkUsername(username, authenticatedUsernames) !== 'valid') {
         usernameRef.current.focus();
         return;
      }

      setLoading(true);

      if (name) {
         updateProfile(auth.currentUser, {
            displayName: name,
         });
      }

      if (previewImg) {
         uploadString(storageRef, previewImg, 'data_url').then((_) => {
            getDownloadURL(storageRef).then((url) => {
               updateProfileData({ ...newData, profile: url }, user.userId)
                  .then((_) => {
                     setLoading(false);
                     setTimeout(() => navigate(`/${username}`), 300);
                     // console.log('prifile informations are updated');
                  })
                  .catch((err) => {
                     setLoading(false);
                     console.log(err);
                  });

               updateProfile(auth.currentUser, { photoURL: url });
            });
         });
         return;
      }

      updateProfileData(newData, user.userId)
         .then((_) => {
            setLoading(false);
            setTimeout(() => navigate(`/${username}`), 300);
            // console.log('prifile informations are updated');
         })
         .catch((err) => {
            setLoading(false);
            console.log(err);
         });
   };

   const removeProfileImgHandler = (url) => {
      setLoading(true);

      removeImage(url);
      updateProfileData({ profile: '' }, user.userId)
         .then((_) => {
            setLoading(false);
            // console.log('prifile informations are updated');
         })
         .catch((err) => {
            setLoading(false);
            console.log(err);
         });
   };

   return (
      <Box maxW='1000px' w='100%' mt='1rem' px={{ md: '.5rem' }} flex='1'>
         <Heading fontSize={{ base: '1.3rem', md: '1.5rem' }} ps='.5rem'>
            Profile for{' '}
            <Text
               color={nameColor}
               as='span'
               cursor='pointer'
               onClick={() => navigate(`/${currentUserProfile.username}`)}
            >
               @{currentUserProfile?.name} 🤓
            </Text>
         </Heading>

         {/* form */}
         <Box
            as='form'
            maxW='720px'
            mx='auto'
            mt='1rem'
            pos='relative'
            onSubmit={updateProfileHandler}
         >
            <User
               nameRef={nameRef}
               usernameRef={usernameRef}
               emailRef={emailRef}
               profileData={currentUserProfile}
               authenticatedUsernames={authenticatedUsernames}
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

            <CustomizeProfileCard
               p='1rem'
               pos='sticky'
               bottom='0'
               zIndex='2'
               w='100%'
            >
               <PrimaryBtn
                  bg='light.primary'
                  w='100%'
                  disabled={loading}
                  type='submit'
               >
                  {loading && <Spinner size='sm' mr={3} />}
                  {loading ? 'Updating' : 'Update'} Profile Information.
               </PrimaryBtn>
            </CustomizeProfileCard>
         </Box>
      </Box>
   );
};

export default CustomizeProfile;
