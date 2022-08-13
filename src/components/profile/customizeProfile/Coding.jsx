import React from 'react';
import { Box, Text, Textarea, VStack } from '@chakra-ui/react';
import {
   InputborderColor,
   smallLabelStyles,
   titleStyles,
   whiteBoxStyles,
} from '../../../utils/CustomizeProfileStyles';

const Coding = ({
   learningRef,
   skillRef,
   hackingRef,
   avaliableRef,
   profileData,
}) => {
   return (
      <Box {...whiteBoxStyles}>
         <Text {...titleStyles}>Coding</Text>

         <VStack spacing={3}>
            <Box w='100%'>
               <label>Currently learning</label>
               <Text {...smallLabelStyles}>
                  What are you learning right now? What are the new tools and
                  languages you're picking up right now?
               </Text>
               <Textarea
                  {...InputborderColor}
                  ref={learningRef}
                  defaultValue={profileData?.learning}
               />
            </Box>

            <Box w='100%'>
               <label>Skill / language</label>
               <Text {...smallLabelStyles}>
                  What tools and languages are you most experienced with? Are
                  you specialized or more of a generalist?
               </Text>
               <Textarea
                  placeholder='Any languages, frameworks, etc. to highlight?'
                  {...InputborderColor}
                  ref={skillRef}
                  defaultValue={profileData?.skills}
               />
            </Box>

            <Box w='100%'>
               <label>Currently hacking on</label>
               <Text {...smallLabelStyles}>
                  What projects are currently occupying most of your time?
               </Text>
               <Textarea
                  {...InputborderColor}
                  ref={hackingRef}
                  defaultValue={profileData?.hacking}
               />
            </Box>

            <Box w='100%'>
               <label>Available for</label>
               <Text {...smallLabelStyles}>
                  What kinds of collaborations or discussions are you available
                  for? What's a good reason to say Hey! to you these days?
               </Text>
               <Textarea
                  {...InputborderColor}
                  ref={avaliableRef}
                  defaultValue={profileData?.avaliable}
               />
            </Box>
         </VStack>
      </Box>
   );
};

export default Coding;
