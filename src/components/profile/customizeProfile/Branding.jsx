import { Box, Input, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
   InputborderColor,
   smallLabelStyles,
   titleStyles,
   whiteBoxStyles,
} from '../../../utils/CustomizeProfileStyles';
import { ChromePicker } from 'react-color';
import useClickOutside from '../../../hooks/useClickOutside';
import { isTouchDevice } from '../../../helper/isTouchDevice';

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

   // prevent scroll when picking brand color
   useEffect(() => {
      const picker = document.querySelector('.chrome-picker');

      const preventScroll = () => {
         document.body.style.height = '100vh';
         document.body.style.overflow = 'hidden';
         console.log('hi');
      };

      const enableScroll = () => {
         document.body.style.height = 'auto';
         document.body.style.overflow = 'auto';
      };

      // listen event when picker exist
      if (picker && isTouchDevice()) {
         picker.addEventListener('mouseover', preventScroll);
         picker.addEventListener('mouseout', enableScroll);
      }
   }, [showColorPicker]);

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

                  <Box
                     bg={brandColor}
                     height='32px'
                     w='40px'
                     pos='absolute'
                     left='.5rem'
                     borderRadius='5px'
                     zIndex={2}
                     cursor='pointer'
                     className='color-board'
                  />

                  {/* option 2 default input */}

                  {/* <Input
                     pos='absolute'
                     top='0'
                     left='0'
                     type='color'
                     className='color-input'
                     w='90px'
                     border='none'
                     value={brandColor}
                     cursor='pointer'
                     zIndex={2}
                     _focus={{
                        background: 'none !important',
                        borderColor: 'none !important',
                        boxShadow: 'none !important',
                     }}
                     ref={backgroundRef}
                     onChange={({ target }) => setBrandColor(target.value)}
                  /> */}

                  <Input
                     ref={backgroundRef}
                     type='text'
                     {...InputborderColor}
                     ps='60px'
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
