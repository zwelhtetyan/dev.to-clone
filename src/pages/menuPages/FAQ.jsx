import { Box, Heading, Text } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import Card from './Card';

const Title = ({ children }) => {
   return (
      <Heading fontSize={{ base: '1.3rem', md: '1.5rem' }}>{children}</Heading>
   );
};

const FAQ = () => {
   // scroll top
   useEffect(() => window.scrollTo(0, 0), []);

   return (
      <Card>
         <Heading fontSize={{ base: '1.7rem', md: '2.5rem' }}>
            Frequently Asked Questions 🤔
         </Heading>
         <Text fontStyle='italic' my='1rem'>
            Some of these are not actually asked frequently, but they're still
            good to know.
         </Text>

         <Title>How do I post article on dev.to?</Title>
         <Text mb='1rem'>
            Click on "Create Post" in the top right corner of the site. Write
            your article, give it a title, tag it with appropriate tags, and
            fill out any other relevant fields. Then, once you're ready, click
            publish. Your post will now be published. You can also draft your
            post.
         </Text>

         <Title>
            Can I add image url instead of uploading local images in markdown?
         </Title>
         <Text>Of course, You can add image url using the syntax below.</Text>

         <Box mb='1rem' overflow='auto' mt='.5rem'>
            <Text
               as='pre'
               bg='#f9ff21'
               color='light.color'
               display='inline-block'
            >
               ![image description](https://example_image.png)
            </Text>
         </Box>
      </Card>
   );
};

export default FAQ;
