import React from 'react';
import {
   Box,
   Divider,
   Flex,
   Heading,
   HStack,
   Image,
   Link,
   Text,
} from '@chakra-ui/react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { PrimaryBtn } from '../../utils/Buttons';
import joinOn from '../../assets/logo/joinOn.svg';
import location from '../../assets/logo/location.svg';
import personalWebsite from '../../assets/logo/personalWebsite.svg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth';
import defaultProfile from '../../assets/images/defaultProfile.jpg';

const LinkIcon = ({ hoverColor, href, children, onClick }) => {
   return (
      <Link
         href={href}
         _hover={{ svg: { color: hoverColor } }}
         target='blank'
         onClick={onClick}
      >
         {children}
      </Link>
   );
};

const Work = ({ title, text }) => {
   return (
      <Box
         px={{ base: '0', md: '1rem' }}
         flex={1}
         textAlign={{ base: 'start', md: 'center' }}
      >
         <Text fontWeight={700} color='#717171'>
            {title}
         </Text>
         <Text letterSpacing='.5px'>{text}</Text>
      </Box>
   );
};

const TopLayer = ({ profileData }) => {
   const navigate = useNavigate();
   const user = useAuth();

   const date = new Date(+user.createdAt).toDateString().split(' ').slice(1, 4);
   const joinOnDate = [date[0], +date[1] + ',', date[2]].join(' ');

   return (
      <Box
         boxShadow='0 0 0 1px rgb(23 23 23 / 10%)'
         bg='white'
         mt='-3.5rem'
         borderRadius='5px'
         pos='relative'
         p={{ base: '.5rem .5rem 2rem', md: '1rem 1rem 2rem' }}
         textAlign={{ base: 'start', md: 'center' }}
      >
         <Box
            title='profile'
            boxSize={{ base: '60px', md: '120px' }}
            pos='absolute'
            top={{ base: '-30px', md: '-60px' }}
            left={{ base: '2.5rem', md: '50%' }}
            transform='translateX(-50%)'
            borderWidth={{
               md: '6px ',
               base: '4px ',
            }}
            borderColor={profileData?.background || '#000000'}
            rounded='full'
            backgroundImage={profileData?.profile || defaultProfile}
            backgroundColor={profileData?.background || '#000000'}
            backgroundPosition='center'
            backgroundRepeat='no-repeat'
            backgroundSize='cover'
         />

         <HStack justify='flex-end' mb={['1rem', '1rem', '2rem']}>
            <PrimaryBtn
               bg='rgb(59 73 223)'
               onClick={() => navigate('/customize-profile')}
            >
               Edit Profile
            </PrimaryBtn>
         </HStack>

         <Heading fontSize={['1.5rem', '2rem']}>{profileData?.name}</Heading>

         <Text
            fontSize='1.1rem'
            letterSpacing='.5px'
            color='#717171'
            mt='.3rem'
         >
            {profileData?.bio || '404 bio not found'}
         </Text>

         <Flex
            justifyContent={{ base: 'flex-start', md: 'center' }}
            mt='1rem'
            color='#717171'
            fontSize='15px'
            gap={3}
            wrap='wrap'
         >
            <HStack>
               <Image src={joinOn} alt='icon' />
               <Text>Joined on {joinOnDate}</Text>
            </HStack>

            {profileData?.location && (
               <HStack>
                  <Image src={location} alt='icon' />
                  <Text>{profileData.location}</Text>
               </HStack>
            )}

            {profileData?.website && (
               <HStack cursor='pointer'>
                  <Image src={personalWebsite} alt='icon' />
                  <Link
                     _hover={{ color: 'rgb(59 73 223)' }}
                     href={profileData.website}
                     target='blank'
                  >
                     {profileData?.website}
                  </Link>
               </HStack>
            )}

            {profileData?.github && (
               <LinkIcon href={profileData.github} hoverColor='black'>
                  <BsGithub size={22} title='Github' />
               </LinkIcon>
            )}

            {profileData?.twitter && (
               <LinkIcon href={profileData.twitter} hoverColor='#1da1f2'>
                  <BsTwitter size={23} title='Twitter' />
               </LinkIcon>
            )}

            {profileData?.email && (
               <LinkIcon
                  hoverColor='black'
                  onClick={() => window.open(`mailto:${profileData.email}`)}
               >
                  <MdEmail size={23} title='Email' />
               </LinkIcon>
            )}
         </Flex>

         <Divider mt='2rem' mb={3} />

         <Flex flexDirection={{ base: 'column', md: 'row' }} gap={2}>
            {profileData?.education && (
               <Work title='Education' text={profileData.education} />
            )}
            {profileData?.work && <Work title='Work' text={profileData.work} />}
         </Flex>
      </Box>
   );
};

export default TopLayer;
