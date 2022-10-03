import { extendTheme } from '@chakra-ui/react';
import { styles } from './globalStyles';
import { colors } from './colors';

const breakpoints = {
   xl: '1024px',
};

const config = {
   initialColorMode: 'light',
   useSystemColorMode: true,
};

const theme = extendTheme({
   styles,
   breakpoints,
   colors,
   config,
});

export default theme;
