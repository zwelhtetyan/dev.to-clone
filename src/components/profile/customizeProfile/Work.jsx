import React from 'react';
import { Box, Input, Text, VStack } from '@chakra-ui/react';
import {
   titleStyles,
   CustomizeProfileCard,
   Label,
} from '../../../utils/CustomizeProfileStyles';

const Work = ({ workRef, educationRef, profileData }) => {
   return (
      <CustomizeProfileCard>
         <Text {...titleStyles}>Work</Text>

         <VStack spacing={3}>
            <Box w='100%'>
               <Label mb='.3rem'>Work</Label>
               <Input
                  defaultValue={profileData?.work}
                  placeholder='What do you do?'
                  type='text'
                  ref={workRef}
               />
            </Box>

            <Box w='100%'>
               <Label mb='.3rem'>Education</Label>
               <Input
                  defaultValue={profileData?.education}
                  placeholder='What did you go to school?'
                  type='text'
                  ref={educationRef}
               />
            </Box>
         </VStack>
      </CustomizeProfileCard>
   );
};

export default Work;
