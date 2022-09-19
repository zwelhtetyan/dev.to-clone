import { Heading, Link, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Card from './Card';

const Socials = ({ socialName, address, href, onClick }) => {
   return (
      <Text>
         {socialName}:{' '}
         <Link
            as='a'
            cursor='pointer'
            color='rgb(59 73 223)'
            _hover={{ color: 'rgb(47 58 178)' }}
            href={href}
            onClick={onClick}
            target='blank'
            mb='1rem'
            display='inline-block'
         >
            {address}
         </Link>
      </Text>
   );
};

const Contact = () => {
   // scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   return (
      <Card>
         <Heading fontSize={{ base: '1.7rem', md: '2.5rem' }} mb='1.5rem'>
            Contacts
         </Heading>

         <Text mb='1rem'>DEV Community 👩‍💻👨‍💻 would love to hear from you!</Text>

         <Socials
            socialName='Email'
            address='zwelhtetyandev@gmail.com'
            onClick={() => window.open(`mailto:zwelhtetyandev@gamil.com`)}
         />

         <Socials
            socialName='Github'
            address='@zwelhtetyan'
            href='https://github.com/zwelhtetyan'
         />

         <Socials
            socialName='Linkedin'
            address='@zwelhtetyan'
            href='https://www.linkedin.com/in/zwelhtetyan/'
         />

         <Socials
            socialName='Twitter'
            address='@zwelhtetyan'
            href='https://twitter.com/ZwelHtetYan2'
         />
      </Card>
   );
};

export default Contact;
