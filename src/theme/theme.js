import { useEffect, useState } from 'react';

const dark = {
    // bg: '#121212',
    // primary: '#ffffff',
    // secondary: '#C9C9C9',
};

const light = {
    bg: '#F5F5F5',
    foreBg: '#ffffff',
    primaryText: '#242424',
    secondaryText: '#171717',
};

const useTheme = () => {
    const [theme, setTheme] = useState(light);
    const [isLightTheme, setIsLightTheme] = useState(true);

    const toggleTheme = () => setIsLightTheme((prevTheme) => !prevTheme);

    useEffect(() => setTheme(isLightTheme ? light : dark), [isLightTheme]);

    return { theme, toggleTheme };
};

export default useTheme;
