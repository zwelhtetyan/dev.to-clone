import React from 'react';
import { Box, Input, Text, Textarea, VStack } from '@chakra-ui/react';
import {
   CustomizeProfileCard,
   Label,
   titleStyles,
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
      <CustomizeProfileCard>
         <Text {...titleStyles}>Basic</Text>

         <VStack spacing={3}>
            <Box w='100%'>
               <Label mb='.3rem'>Website URL</Label>
               <Input
                  defaultValue={profileData?.website}
                  placeholder='https://yoursite.com'
                  type='url'
                  ref={websiteRef}
               />
            </Box>

            <Box w='100%'>
               <Label mb='.3rem'>Github</Label>
               <Input
                  defaultValue={profileData?.github}
                  placeholder='https://github.com/username'
                  type='url'
                  ref={githubRef}
               />
            </Box>

            <Box w='100%'>
               <Label mb='.3rem'>Twitter</Label>
               <Input
                  defaultValue={profileData?.twitter}
                  placeholder='https://twitter.com/username'
                  type='url'
                  ref={twitterRef}
               />
            </Box>

            <Box w='100%'>
               <Label mb='.3rem'>Location</Label>
               <Input
                  defaultValue={profileData?.location}
                  placeholder='Halifax, Nova Scotia'
                  type='text'
                  ref={locationRef}
               />
            </Box>

            <Box w='100%'>
               <Label mb='.3rem'>Bio</Label>

               <Textarea
                  defaultValue={profileData?.bio}
                  placeholder='A Short Bio...'
                  ref={bioRef}
               />
            </Box>
         </VStack>
      </CustomizeProfileCard>
   );
};

export default Basic;
