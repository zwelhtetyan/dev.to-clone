const parse = require('html-react-parser');

export const htmlToJsx = (html) => {
   const reactElement = parse(html);
   return reactElement;
};
