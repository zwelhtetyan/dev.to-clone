import React from 'react';
import { Box, Text, Textarea, VStack } from '@chakra-ui/react';
import {
   titleStyles,
   CustomizeProfileCard,
   SmallLabel,
   Label,
} from '../../../utils/CustomizeProfileStyles';

const Coding = ({
   learningRef,
   skillRef,
   hackingRef,
   avaliableRef,
   profileData,
}) => {
   return (
      <CustomizeProfileCard>
         <Text {...titleStyles}>Coding</Text>

         <VStack spacing={3}>
            <Box w='100%'>
               <Label>Currently learning</Label>
               <SmallLabel>
                  What are you learning right now? What are the new tools and
                  languages you're picking up right now?
               </SmallLabel>
               <Textarea
                  ref={learningRef}
                  defaultValue={profileData?.learning}
               />
            </Box>

            <Box w='100%'>
               <Label>Skill / language</Label>
               <SmallLabel>
                  What tools and languages are you most experienced with? Are
                  you specialized or more of a generalist?
               </SmallLabel>
               <Textarea
                  placeholder='Any languages, frameworks, etc. to highlight?'
                  ref={skillRef}
                  defaultValue={profileData?.skills}
               />
            </Box>

            <Box w='100%'>
               <Label>Currently hacking on</Label>
               <SmallLabel>
                  What projects are currently occupying most of your time?
               </SmallLabel>
               <Textarea ref={hackingRef} defaultValue={profileData?.hacking} />
            </Box>

            <Box w='100%'>
               <Label>Available for</Label>
               <SmallLabel>
                  What kinds of collaborations or discussions are you available
                  for? What's a good reason to say Hey! to you these days?
               </SmallLabel>
               <Textarea
                  ref={avaliableRef}
                  defaultValue={profileData?.avaliable}
               />
            </Box>
         </VStack>
      </CustomizeProfileCard>
   );
};

export default Coding;
