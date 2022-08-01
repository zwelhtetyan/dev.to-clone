import * as Showdown from 'showdown';

const converter = () => {
   const converter = new Showdown.Converter({
      tables: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tasklists: true,
   });
   return converter;
};

export default converter;
