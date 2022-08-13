import React from 'react';
import { Box, FormControl, Input, Text, Textarea } from '@chakra-ui/react';
import {
   formControlStyles,
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

         <FormControl {...formControlStyles}>
            <Box>
               <label style={labelStyles}>Website URL</label>
               <Input
                  defaultValue={profileData?.website}
                  placeholder='https://yoursite.com'
                  type='url'
                  {...InputborderColor}
                  ref={websiteRef}
               />
            </Box>

            <Box>
               <label style={labelStyles}>Github</label>
               <Input
                  defaultValue={profileData?.github}
                  placeholder='https://github.com/username'
                  type='url'
                  {...InputborderColor}
                  ref={githubRef}
               />
            </Box>

            <Box>
               <label style={labelStyles}>Twitter</label>
               <Input
                  defaultValue={profileData?.twitter}
                  placeholder='https://twitter.com/username'
                  type='url'
                  {...InputborderColor}
                  ref={twitterRef}
               />
            </Box>

            <Box>
               <label style={labelStyles}>Location</label>
               <Input
                  defaultValue={profileData?.location}
                  placeholder='Halifax, Nova Scotia'
                  type='text'
                  {...InputborderColor}
                  ref={locationRef}
               />
            </Box>

            <Box>
               <label style={labelStyles}>Bio</label>

               <Textarea
                  defaultValue={profileData?.bio}
                  placeholder='A Short Bio...'
                  {...InputborderColor}
                  ref={bioRef}
               />
            </Box>
         </FormControl>
      </Box>
   );
};

export default Basic;
