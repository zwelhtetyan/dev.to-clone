const HtmlToReactParser = require('html-to-react').Parser;

export const htmlToJsx = (html) => {
   const htmlInput = html;
   const htmlToReactParser = new HtmlToReactParser();
   const reactElement = htmlToReactParser.parse(htmlInput);
   return reactElement;
};
