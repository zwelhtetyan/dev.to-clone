import * as React from 'react';
import ReactMde from 'react-mde';
import 'react-mde/lib/styles/css/react-mde-all.css';
import { useDispatch } from 'react-redux';
import { getDefaultToolbarCommands } from 'react-mde';
import { Box } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import { removeImage, uploadImage } from '../lib/api';
import {
   getItemFromLocalStorage,
   removeFromLocalStorage,
   saveToLocalStorage,
} from '../helper/localStorage';
import '../styles/markdown.scss';
import { setCommentVal } from '../store/comment';
import converter from '../helper/converter';
import MDEToolbarImgIcon from '../utils/MDEToolbarImgIcon';
import { setMDEValueToStore } from '../store/post/postData';

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

const MDE = ({ MDEValue, where, height, isSubmitting, setUploadingImg }) => {
   const [value, setValue] = React.useState(MDEValue || '');
   const [selectedTab, setSelectedTab] = React.useState('write');
   const [uploadedMDEImg, setUploadedMdeImg] = React.useState(
      getItemFromLocalStorage('uploadedMDEImg') || []
   );

   const dispatch = useDispatch();

   React.useEffect(() => {
      if (where === 'CREATE_POST') {
         dispatch(setMDEValueToStore(value));
      } else if (where === 'DISCUSSION') {
         dispatch(setCommentVal(value));
      }
   }, [value, dispatch, where]);

   React.useEffect(() => {
      saveToLocalStorage('uploadedMDEImg', JSON.stringify(uploadedMDEImg));
   }, [uploadedMDEImg]);

   React.useEffect(() => {
      setValue(MDEValue);
   }, [MDEValue]);

   if (isSubmitting && uploadedMDEImg.length !== 0) {
      // eslint-disable-next-line array-callback-return
      uploadedMDEImg.map((img) => {
         console.log('map render');
         if (!MDEValue?.includes(img.url)) {
            removeImage(img.path).catch((err) => console.log(err));
         }
      });

      setUploadedMdeImg([]);
      removeFromLocalStorage('uploadedMDEImg');
   }

   const mdeImgUploadHandler = (e) => {
      const image = e.target.files[0];
      if (image) {
         document.querySelector('.mde-text').disabled = true;
         setUploadingImg(true);
         setValue((prevVal) => prevVal.replace('🌌img_url', 'uploading...'));

         const selectedImgPath = `images/${img.name}${nanoid()}`;

         uploadImage(image, selectedImgPath)
            .then((url) => {
               document.querySelector('.mde-text').disabled = false;
               setValue((prevVal) =>
                  prevVal.replace('uploading...', `![](${url})`)
               );
               setUploadedMdeImg((prevArr) => [
                  ...prevArr,
                  { url: `![](${url})`, path: selectedImgPath },
               ]);
               setUploadingImg(false);
            })
            .catch((err) => console.log(err));

         e.target.value = ''; // otherwise input event doesn't trigger again user add the same file
      }
   };

   const img = {
      name: 'image_url',
      icon: () => <MDEToolbarImgIcon onChange={mdeImgUploadHandler} />,
      execute: (opts) => {
         opts.textApi.replaceSelection('🌌img_url');
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
               Promise.resolve(converter().makeHtml(markdown))
            }
         />
      </Box>
   );
};

export default React.memo(MDE);
