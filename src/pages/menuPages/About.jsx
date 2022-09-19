import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { useEffect } from 'react';
import Card from './Card';

const About = () => {
   // scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   return (
      <Card>
         <Heading fontSize={{ base: '1.7rem', md: '2.5rem' }} mb='1rem'>
            About DEV
         </Heading>

         <Text mb='1rem'>
            DEV is a community of software developers getting together to help
            one another out. The software industry relies on collaboration and
            networked learning. We provide a place for that to happen.
         </Text>

         <Text mb='1rem'>
            We believe in transparency and adding value to the ecosystem. We
            hope you enjoy poking around and participating!
         </Text>

         <Text>Happy coding 💻❤️</Text>
      </Card>
   );
};

export default About;
