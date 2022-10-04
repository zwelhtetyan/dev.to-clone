import React from 'react';
import {
   Box,
   Flex,
   Grid,
   HStack,
   Radio,
   RadioGroup,
   Text,
   useColorMode,
   useColorModeValue,
} from '@chakra-ui/react';
import { useAuth } from '../context/auth';
import { Navigate } from 'react-router-dom';

const Apperance = () => {
   const { colorMode, setColorMode } = useColorMode();
   const user = useAuth();

   const cardBg = useColorModeValue('light.cardBg', 'dark.cardBg');

   if (!user) {
      return <Navigate to='/create-account' replace />;
   }

   const ApperanceBox = ({ mode, mainBg, color, boxBg, textColor }) => {
      return (
         <Box
            p='1rem'
            className='shadowSecondary'
            cursor='pointer'
            flex={1}
            borderRadius='5px'
            _hover={{ bg: useColorModeValue('light.bg', 'dark.bg') }}
            onClick={() => setColorMode(mode.toLowerCase())}
         >
            <RadioGroup value={colorMode}>
               <Radio mb={2} value={mode.toLowerCase()}>
                  {mode} Theme
               </Radio>

               <Box m='auto' w='90%' borderRadius='5px' bg={boxBg}>
                  <Box
                     h='15px'
                     bg={mainBg}
                     borderTopLeftRadius='5px'
                     borderTopRightRadius='5px'
                     py='.15rem'
                     mb={{ base: '.2rem', md: '.3rem' }}
                     border={`1px solid ${color}`}
                  >
                     <Box w='50%' h='100%' bg={color} m='auto'></Box>
                  </Box>

                  <Grid
                     h='4rem'
                     gridTemplateColumns='20% 1fr 20%'
                     gap={{ base: '.2rem', md: '.3rem' }}
                  >
                     <Box
                        bg={mainBg}
                        borderRadius='3px'
                        border={`1px solid ${color}`}
                     ></Box>
                     <Flex justify='center' flexDir='column' align='center'>
                        <Text lineHeight='.7rem' mb='.2rem' color={textColor}>
                           ~ ~ ~
                        </Text>
                        <Box
                           bg={mainBg}
                           flex={1}
                           w='100%'
                           borderRadius='3px'
                           border={`1px solid ${color}`}
                        ></Box>
                     </Flex>
                     <Box
                        bg={mainBg}
                        borderRadius='3px'
                        border={`1px solid ${color}`}
                     ></Box>
                  </Grid>
               </Box>
            </RadioGroup>
         </Box>
      );
   };

   return (
      <Box
         display='flex'
         alignItems='center'
         justifyContent='center'
         flex='1'
         w='100%'
         maxW='1280px'
         px={{ base: '.5rem', xl: '1rem' }}
         borderRadius={{ md: '5px' }}
      >
         <Box
            bg={cardBg}
            className='shadow'
            height='20rem'
            w='768px'
            p={{ base: '.5rem', md: '1rem' }}
            borderRadius='5px'
         >
            <Text fontWeight={700} fontSize='2xl' mb='1rem'>
               Appearance
            </Text>

            <Text mb='.5rem'>Site Theme</Text>

            <HStack w={{ base: '100%', xl: '80%' }}>
               <ApperanceBox
                  boxBg='#F9F9FA'
                  mode='Light'
                  mainBg='#ffffff'
                  color='#e8e7e7'
                  textColor='#1c2938'
               />

               <ApperanceBox
                  boxBg='#0D1219'
                  mode='Dark'
                  mainBg='#1c2938'
                  color='#424a54'
                  textColor='#ffffff'
               />
            </HStack>
         </Box>
      </Box>
   );
};

export default Apperance;
