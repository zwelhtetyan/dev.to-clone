import React from 'react';
import { Box, FormControl, Input, Text } from '@chakra-ui/react';
import {
   formControlStyles,
   InputborderColor,
   labelStyles,
   titleStyles,
   whiteBoxStyles,
} from '../../../utils/CustomizeProfileStyles';

const Work = ({ workRef, educationRef, profileData }) => {
   return (
      <Box {...whiteBoxStyles}>
         <Text {...titleStyles}>Work</Text>

         <FormControl {...formControlStyles}>
            <Box>
               <label style={labelStyles}>Work</label>
               <Input
                  defaultValue={profileData?.work}
                  placeholder='What do you do? Example: CEO at Google'
                  type='text'
                  {...InputborderColor}
                  ref={workRef}
               />
            </Box>

            <Box>
               <label style={labelStyles}>Education</label>
               <Input
                  defaultValue={profileData?.education}
                  placeholder='What did you go to school?'
                  type='text'
                  {...InputborderColor}
                  ref={educationRef}
               />
            </Box>
         </FormControl>
      </Box>
   );
};

export default Work;
