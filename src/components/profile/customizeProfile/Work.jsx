import React from 'react';
import { Box, Input, Text, VStack } from '@chakra-ui/react';
import {
   InputborderColor,
   labelStyles,
   titleStyles,
   whiteBoxStyles,
} from '../../../utils/CustomizeProfileStyles';

const Work = ({ workRef, educationRef, profileData }) => {
   return (
      <Box {...whiteBoxStyles}>
         <Text {...titleStyles}>Work</Text>

         <VStack spacing={3}>
            <Box w='100%'>
               <label style={labelStyles}>Work</label>
               <Input
                  defaultValue={profileData?.work}
                  placeholder='What do you do?'
                  type='text'
                  {...InputborderColor}
                  ref={workRef}
               />
            </Box>

            <Box w='100%'>
               <label style={labelStyles}>Education</label>
               <Input
                  defaultValue={profileData?.education}
                  placeholder='What did you go to school?'
                  type='text'
                  {...InputborderColor}
                  ref={educationRef}
               />
            </Box>
         </VStack>
      </Box>
   );
};

export default Work;
