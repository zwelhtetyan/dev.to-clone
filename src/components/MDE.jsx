import * as React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { setMDEValue } from '../store/publishPost';
import { useDispatch } from 'react-redux';

const converter = new Showdown.Converter({
   tables: true,
   simplifiedAutoLink: true,
   strikethrough: true,
   tasklists: true,
});

export default function MDE() {
   const [value, setValue] = React.useState('');
   const [selectedTab, setSelectedTab] = React.useState('write');

   const dispatch = useDispatch();

   React.useEffect(() => {
      dispatch(setMDEValue(converter.makeHtml(value)));
   }, [value, dispatch]);

   return (
      <div className='container'>
         <ReactMde
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            minEditorHeight={250}
            loadingPreview='loading...'
            minPreviewHeight={240}
            generateMarkdownPreview={(markdown) =>
               Promise.resolve(converter.makeHtml(markdown))
            }
         />
      </div>
   );
}
