import * as React from 'react';
import ReactMde from 'react-mde';
import * as Showdown from 'showdown';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { setMDEValue } from '../store/publishPost';
import { useDispatch } from 'react-redux';
import { getDefaultToolbarCommands } from 'react-mde';
import { FaImage } from 'react-icons/fa';
import { Box, Input } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { removeImage, uploadImage } from '../lib/api';
import {
   removeFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';
import '../styles/markdown.scss';
import { setCommentVal } from '../store/comment';

const converter = new Showdown.Converter({
   tables: true,
   simplifiedAutoLink: true,
   strikethrough: true,
   tasklists: true,
});

const customToolbarCommands = () => {
   const commands = getDefaultToolbarCommands();
   commands[1].splice(3, 1, 'code-block', 'img_url');
   return commands;
};

const codeBlock = {
   name: 'code-block',
   icon: () => '{ }',
   execute: (opts) => {
      opts.textApi.replaceSelection('```\n put your code block here... \n```');
   },
};

const MDE = ({ MDEValue, where, isSubmitting, height, setUploadingMDEImg }) => {
   const [value, setValue] = React.useState(MDEValue?.write || '');
   const [selectedTab, setSelectedTab] = React.useState('write');
   const [uploadedMDEImg, setUploadedMdeImg] = React.useState(
      JSON.parse(localStorage.getItem('uploadedMDEImg')) || []
   );

   const dispatch = useDispatch();

   React.useEffect(() => {
      if (where === 'CREATE_POST') {
         dispatch(
            setMDEValue({
               write: value,
               preview: converter.makeHtml(value),
            })
         );
      } else if (where === 'DISCUSSION') {
         dispatch(setCommentVal(converter.makeHtml(value)));
      }
   }, [value, dispatch, where]);

   React.useEffect(() => {
      saveToLocalStorage('uploadedMDEImg', JSON.stringify(uploadedMDEImg));
   }, [uploadedMDEImg]);

   if (isSubmitting) {
      // eslint-disable-next-line array-callback-return
      uploadedMDEImg.map((img) => {
         console.log('map render');
         if (!MDEValue?.write.includes(img.url)) {
            removeImage(img.path).catch((err) => console.log(err));
         }
      });

      removeFromLocalStorage('uploadedMDEImg');
   }

   const mdeImgUploadHandler = (e) => {
      const image = e.target.files[0];
      if (image) {
         document.querySelector('.mde-text').disabled = true;
         setUploadingMDEImg(true);
         setValue((prevVal) => prevVal + 'loading...');

         const selectedImgPath = `images/${img.name}${nanoid()}`;

         uploadImage(image, selectedImgPath)
            .then((url) => {
               document.querySelector('.mde-text').disabled = false;
               setValue((prevVal) =>
                  prevVal.replace('loading...', `\n![](${url})`)
               );
               setUploadedMdeImg((prevArr) => [
                  ...prevArr,
                  { url: `![](${url})`, path: selectedImgPath },
               ]);
               setUploadingMDEImg(false);
            })
            .catch((err) => console.log(err));

         e.target.value = ''; // otherwise input event doesn't trigger again user add the same file
      }
   };

   const img = {
      name: 'image-url',
      icon: () => (
         <Box as='label' m='0' cursor='pointer' pt='1' display='block'>
            <Input
               display='none'
               type='file'
               accept='image/jpeg, image/png, image/jpg , image/webp, image/gif'
               onChange={mdeImgUploadHandler}
            />
            <FaImage size={17} />
         </Box>
      ),
      execute: (opts) => {
         opts.textApi.replaceSelection('');
      },
   };

   return (
      <Box className='container' w='100%'>
         <ReactMde
            commands={{
               'code-block': codeBlock,
               img_url: img,
            }}
            toolbarCommands={customToolbarCommands()}
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            minEditorHeight={height}
            loadingPreview='loading...'
            minPreviewHeight={height - 10}
            generateMarkdownPreview={(markdown) =>
               Promise.resolve(converter.makeHtml(markdown))
            }
         />
      </Box>
   );
};

export default React.memo(MDE);
