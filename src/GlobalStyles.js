import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }

        body {
            background-color: ${({ theme }) => theme.bg};
            color: ${({ theme }) => theme.primary};
        }

        .app {
            max-width: 1280px;
            margin: auto;
        }
`;

export default GlobalStyles;
