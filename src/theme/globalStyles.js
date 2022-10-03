import { mode } from '@chakra-ui/theme-tools';

export const styles = {
   global: (props) => ({
      body: {
         paddingTop: 'calc(56px + 0.5rem) !important',
         bg: mode('light.bg', 'dark.bg')(props),
         color: mode('light.color', 'dark.color')(props),
      },

      'input,textArea,select': {
         backgroundColor: mode(
            'light.cardBg !important',
            'dark.bg !important'
         )(props),
         borderColor: mode(
            '#cfcece !important',
            'rgb(64 64 64) !important'
         )(props),
         _hover: {
            borderColor: mode(
               '#b1b1b1 !important',
               'rgb(96 96 96) !important'
            )(props),
         },
         _placeholder: {
            color: mode('', '#575757')(props),
         },
      },

      'input:focus-visible, textarea:focus-visible, select:focus-visible': {
         backgroundColor: mode('light.cardBg', 'dark.cardBg')(props),
         borderColor: mode(
            'light.primary !important',
            'dark.primary !important'
         )(props),

         boxShadow: mode(
            '0 0 0 1px rgb(59, 73, 223) !important',
            '0 0 0 1px rgb(129, 140, 248) !important'
         )(props),
      },

      '.mde-header': {
         borderBottom: mode(
            '1px solid rgb(23 23 23 / 13%) !important',
            '1px solid rgb(255 255 255 / 15%) !important'
         )(props),

         bg: mode('light.cardBg !important', 'dark.cardBg !important')(props),
      },

      'textarea.mde-text': {
         border: 'none !important',
         boxShadow: 'none !important',
         bg: mode('light.cardBg', 'dark.bg')(props),
      },

      'ul.mde-header-group li.mde-header-item button': {
         color: mode(
            'rgb(38 38 38) !important',
            'rgb(212 212 212) !important'
         )(props),

         _hover: {
            backgroundColor: 'light.secondary !important',
            borderRadius: '5px',
            color: mode(
               'light.headingHover !important',
               'dark.headingHover !important'
            )(props),
         },
      },

      '.shadow': {
         boxShadow: mode(
            '0 0 0 1px rgb(23 23 23 / 10%) !important',
            '0 0 0 1px rgb(255 255 255 / 15%) !important'
         )(props),
      },

      '.shadowSecondary': {
         boxShadow: mode(
            '0 0 0 1px rgb(23 23 23 / 5%) !important',
            '0 0 0 1px rgb(255 255 255 / 10%) !important'
         )(props),
      },
   }),
};
