import { Box, FormControl, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
   formControlStyles,
   InputborderColor,
   smallLabelStyles,
   titleStyles,
   whiteBoxStyles,
} from '../../../utils/CustomizeProfileStyles';

const Branding = ({ backgroundRef, profileData }) => {
   const [brandColor, setBrandColor] = useState(
      profileData?.background || '#000000'
   );

   return (
      <Box {...whiteBoxStyles}>
         <Text {...titleStyles}>Branding</Text>

         <FormControl {...formControlStyles}>
            <Box>
               <label>Brand color</label>
               <Text {...smallLabelStyles}>
                  Used for backgrounds, borders etc.
               </Text>
               <Box w='50%' pos='relative'>
                  <Input
                     pos='absolute'
                     top='0'
                     left='0'
                     type='color'
                     w='90px'
                     border='none'
                     value={brandColor}
                     cursor='pointer'
                     zIndex={2}
                     ref={backgroundRef}
                     onChange={({ target }) => setBrandColor(target.value)}
                  />

                  <Input
                     type='text'
                     {...InputborderColor}
                     ps='85px'
                     value={brandColor}
                     onChange={({ target }) => setBrandColor(target.value)}
                  />
               </Box>
            </Box>
         </FormControl>
      </Box>
   );
};

export default Branding;
