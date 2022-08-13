import React from 'react';
import { Box, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import {
   InputborderColor,
   labelStyles,
   titleStyles,
   whiteBoxStyles,
} from '../../../utils/CustomizeProfileStyles';

const Basic = ({
   websiteRef,
   githubRef,
   twitterRef,
   locationRef,
   bioRef,
   profileData,
}) => {
   return (
      <Box {...whiteBoxStyles}>
         <Text {...titleStyles}>Basic</Text>

         <VStack spacing={3}>
            <Box w='100%'>
               <label style={labelStyles}>Website URL</label>
               <Input
                  defaultValue={profileData?.website}
                  placeholder='https://yoursite.com'
                  type='url'
                  {...InputborderColor}
                  ref={websiteRef}
               />
            </Box>

            <Box w='100%'>
               <label style={labelStyles}>Github</label>
               <Input
                  defaultValue={profileData?.github}
                  placeholder='https://github.com/username'
                  type='url'
                  {...InputborderColor}
                  ref={githubRef}
               />
            </Box>

            <Box w='100%'>
               <label style={labelStyles}>Twitter</label>
               <Input
                  defaultValue={profileData?.twitter}
                  placeholder='https://twitter.com/username'
                  type='url'
                  {...InputborderColor}
                  ref={twitterRef}
               />
            </Box>

            <Box w='100%'>
               <label style={labelStyles}>Location</label>
               <Input
                  defaultValue={profileData?.location}
                  placeholder='Halifax, Nova Scotia'
                  type='text'
                  {...InputborderColor}
                  ref={locationRef}
               />
            </Box>

            <Box w='100%'>
               <label style={labelStyles}>Bio</label>

               <Textarea
                  defaultValue={profileData?.bio}
                  placeholder='A Short Bio...'
                  {...InputborderColor}
                  ref={bioRef}
               />
            </Box>
         </VStack>
      </Box>
   );
};

export default Basic;
