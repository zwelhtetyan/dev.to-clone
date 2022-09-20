import { Box, Flex, Input, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import {
   InputborderColor,
   smallLabelStyles,
   titleStyles,
   whiteBoxStyles,
} from '../../../utils/CustomizeProfileStyles';
import { ChromePicker } from 'react-color';
import useClickOutside from '../../../hooks/useClickOutside';

const Branding = ({ backgroundRef, profileData }) => {
   const [brandColor, setBrandColor] = useState(
      profileData?.background || '#000000'
   );
   const [showColorPicker, setShowColorPicker] = useState(false);

   const handleChange = (color) => {
      setBrandColor(color.hex);
   };

   //handle click outside to close color picker
   useClickOutside(setShowColorPicker, [
      'color-board',
      'saturation-white',
      'saturation-black',
      'hue-horizontal',
      '',
   ]);

   return (
      <Box {...whiteBoxStyles}>
         <Text {...titleStyles}>Branding</Text>

         <Box>
            <Box>
               <label>Brand color</label>
               <Text {...smallLabelStyles}>
                  Used for backgrounds, borders etc.
               </Text>

               <Box
                  w='100%'
                  pos='relative'
                  display='flex'
                  alignItems='center'
                  sx={{
                     '.chrome-picker': {
                        position: 'absolute',
                        zIndex: 3,
                        top: '2.8rem',
                     },
                     '.chrome-picker .flexbox-fix:last-child': {
                        display: 'none !important',
                     },
                     '.flexbox-fix:first-of-type > div:last-child > div:last-child':
                        {
                           display: 'none !important',
                        },
                     '.flexbox-fix:first-of-type > div:first-of-type': {
                        display: 'none !important',
                     },
                  }}
               >
                  {/* option 1 color picker component*/}

                  {showColorPicker && (
                     <ChromePicker color={brandColor} onChange={handleChange} />
                  )}

                  <Flex
                     h='40px'
                     w='45px'
                     pos='absolute'
                     zIndex={2}
                     ps='.3rem'
                     cursor='pointer'
                     align='center'
                  >
                     <Box
                        bg={brandColor}
                        height='33px'
                        w='100%'
                        borderRadius='5px'
                        className='color-board'
                     />
                  </Flex>

                  <Input
                     ref={backgroundRef}
                     type='text'
                     {...InputborderColor}
                     ps='55px'
                     value={brandColor}
                     onChange={({ target }) => setBrandColor(target.value)}
                  />
               </Box>
            </Box>
         </Box>
      </Box>
   );
};

export default Branding;

// I used color picker component instead of default color picker because default color picker style changed by the browser user used.
