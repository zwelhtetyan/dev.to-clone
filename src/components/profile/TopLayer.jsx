import React from 'react';
import {
   Box,
   Button,
   Flex,
   Heading,
   HStack,
   Image,
   Link,
   Text,
   useColorModeValue,
   Wrap,
} from '@chakra-ui/react';
import { BsGithub, BsTwitter } from 'react-icons/bs';
import { MdEmail } from 'react-icons/md';
import { LightBtn, PrimaryBtn } from '../../utils/Buttons';
import { useAuth } from '../../context/auth';
import defaultProfile from '../../assets/images/default_profile.webp';
import { joinOnDate } from '../../helper/calcTimestamp';
import useFollowUser from '../../hooks/useFollowUser';
import { joinOn, location, personalWebsite } from '../../assets/icons';

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

const TopLayer = ({ profileData, moreInfo, setMoreInfo }) => {
   const user = useAuth();
   const userId = user?.userId;

   const { handleClickFollow, loading } = useFollowUser(profileData, userId);

   const alreadyFollow = profileData?.followers?.includes(userId);

   const dividerColor = useColorModeValue(
      'rgb(23 23 23 / 5%)',
      'rgb(255 255 255 / 10%)'
   );
   const nameColor = useColorModeValue('#090909', '#f9f9f9');
   const bioColor = useColorModeValue('#242424', '#efefef');
   const socialColor = useColorModeValue('#717171', '#a3a3a3');
   const ghostColor = useColorModeValue('light.ghostColor', 'dark.ghostColor');
   const iconHoverColor = useColorModeValue(
      'rgb(23, 23, 23)',
      'rgb(250, 250, 250)'
   );
   const urlHover = useColorModeValue(
      'light.headingHover',
      'dark.headingHover'
   );
   const colorTertiary = useColorModeValue(
      'light.colorTertiary',
      'dark.colorTertiary'
   );

   const borderColor = useColorModeValue('#d6d6d7', '#66686c');
   const hoverBtnColor = useColorModeValue('#F6F6F6', '#1F1F1F');

   const Work = ({ title, text }) => {
      return (
         <Box
            px={{ base: '0', md: '1rem' }}
            flex={1}
            textAlign={{ base: 'start', md: 'center' }}
         >
            <Text fontWeight={700} color={colorTertiary}>
               {title}
            </Text>
            <Text letterSpacing='.5px' color={ghostColor}>
               {text}
            </Text>
         </Box>
      );
   };

   return (
      <Box
         className='shadowSecondary'
         bg={useColorModeValue('light.cardBg', 'dark.cardBg')}
         mt='-3.5rem'
         borderRadius={['0', '0', '5px']}
         pos='relative'
         p={{ base: '1rem .5rem', md: '1rem' }}
         textAlign={{ base: 'start', md: 'center' }}
      >
         <Box
            boxSize={{ base: '60px', md: '120px' }}
            pos='absolute'
            top={{ base: '-30px', md: '-60px' }}
            left={{ base: '2.5rem', md: '50%' }}
            transform='translateX(-50%)'
            borderWidth={{
               md: '7px ',
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

         <HStack justify='flex-end' mb={{ md: '1.5rem' }} h='40px'>
            {!alreadyFollow && (
               <PrimaryBtn
                  bg='light.primary'
                  onClick={handleClickFollow}
                  disabled={loading}
               >
                  {profileData?.id === userId ? 'Edit Profile' : 'Follow'}
               </PrimaryBtn>
            )}

            {alreadyFollow && (
               <LightBtn
                  w='100px'
                  onClick={handleClickFollow}
                  disabled={loading}
               >
                  Following
               </LightBtn>
            )}
         </HStack>

         {profileData && (
            <Box>
               <Heading fontSize={['1.5rem', '1.7rem']} color={nameColor}>
                  {profileData.name}
               </Heading>

               <Text
                  fontSize={{ md: '17px' }}
                  letterSpacing='.5px'
                  color={profileData.bio ? bioColor : ghostColor}
                  mt='.3rem'
                  maxW={{ base: '100%', md: '70%' }}
                  mx='auto'
               >
                  {profileData?.bio?.trim().length
                     ? profileData.bio
                     : '404 bio not found'}
               </Text>

               <Wrap
                  display='flex'
                  justifyContent={{ base: 'flex-start', md: 'center' }}
                  mt='1rem'
                  fontSize='15px'
                  spacing={3}
                  color={socialColor}
               >
                  {profileData?.location && (
                     <HStack>
                        <Image src={location} alt='icon' />
                        <Text>{profileData.location}</Text>
                     </HStack>
                  )}

                  {profileData?.createdAt && (
                     <HStack>
                        <Image src={joinOn} alt='icon' />
                        <Text>
                           Joined on {joinOnDate(profileData.createdAt)}
                        </Text>
                     </HStack>
                  )}

                  {profileData?.website && (
                     <HStack cursor='pointer'>
                        <Image src={personalWebsite} alt='icon' />
                        <Link
                           _hover={{ color: urlHover }}
                           href={profileData.website}
                           target='blank'
                        >
                           {profileData?.website}
                        </Link>
                     </HStack>
                  )}

                  <HStack>
                     {profileData?.github && (
                        <LinkIcon
                           href={profileData.github}
                           hoverColor={iconHoverColor}
                        >
                           <BsGithub size={22} title='Github' />
                        </LinkIcon>
                     )}

                     {profileData?.twitter && (
                        <LinkIcon
                           href={profileData.twitter}
                           hoverColor='#1da1f2'
                        >
                           <BsTwitter size={23} title='Twitter' />
                        </LinkIcon>
                     )}

                     {profileData?.email && (
                        <LinkIcon
                           hoverColor={iconHoverColor}
                           onClick={() =>
                              window.open(`mailto:${profileData.email}`)
                           }
                        >
                           <MdEmail size={23} title='Email' />
                        </LinkIcon>
                     )}
                  </HStack>
               </Wrap>

               {(profileData?.education || profileData?.work) && (
                  <Flex
                     flexDirection={{ base: 'column', md: 'row' }}
                     gap={2}
                     borderTop='1px solid'
                     borderTopColor={dividerColor}
                     mt='2rem'
                     pt={['.5rem', '.5rem', '1rem']}
                  >
                     {profileData?.education && (
                        <Work title='Education' text={profileData.education} />
                     )}
                     {profileData?.work && (
                        <Work title='Work' text={profileData.work} />
                     )}
                  </Flex>
               )}

               {/* more info button */}
               <Button
                  display={{ base: !moreInfo ? 'block' : 'none', md: 'none' }}
                  w='100%'
                  mx='auto'
                  mt='5'
                  bg='transparent'
                  whiteSpace='normal'
                  transition='.3s'
                  border='2px solid'
                  borderColor={borderColor}
                  onClick={() => setMoreInfo(true)}
                  _hover={{ bg: hoverBtnColor }}
                  py='.5rem'
                  height='auto'
               >
                  More info about @{profileData.username}
               </Button>
            </Box>
         )}
      </Box>
   );
};

export default TopLayer;
