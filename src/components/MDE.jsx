import * as React from 'react';
import ReactMde from 'react-mde';
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
import converter from '../helper/converter';
import MDEToolbarImgIcon from '../utils/MDEToolbarImgIcon';
import { setMDEValueToStore } from '../store/post/postData';
import CodeBlockIcon from '../assets/logo/CodeBlockIcon';
import 'react-mde/lib/styles/css/react-mde-all.css';
import '../styles/markdown.scss';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

const customToolbarCommands = () => {
   const commands = getDefaultToolbarCommands();
   commands[1].splice(3, 1, 'code-block', 'img_url');
   return commands;
};

const codeBlock = {
   name: 'code-block',
   icon: () => <CodeBlockIcon />,
   execute: (opts) => {
      opts.textApi.replaceSelection('```\n Enter code here... \n```');
   },
};

const MDE = ({
   MDEValue,
   setMDEValue,
   isSubmitting,
   setUploadingImg,
   placeholder,
}) => {
   const [value, setValue] = React.useState(MDEValue || '');
   const [selectedTab, setSelectedTab] = React.useState('write');
   const [uploadedMDEImg, setUploadedMdeImg] = React.useState(
      getItemFromLocalStorage('uploadedMDEImg') || []
   );

   const dispatch = useDispatch();
   const user = useAuth();
   const navigate = useNavigate();

   React.useEffect(() => {
      const textArea = document.querySelector('.mde-text');
      const checkUser = () => {
         if (!user) {
            navigate('/create-account');
         }
      };
      textArea.addEventListener('click', checkUser);
      return () => textArea.removeEventListener('click', checkUser);
   }, [navigate, user]);

   React.useEffect(() => {
      const mdeHeader = document.querySelector('.mde-header');
      mdeHeader.style.position = 'sticky';
      mdeHeader.style.top = '0';
      mdeHeader.style.zIndex = '1';
   }, []); // sticky header on mobile

   React.useEffect(() => {
      const textBox = document.querySelector('.mde-text');
      textBox.placeholder = placeholder || 'Write your post content here...';
   }, [placeholder]);

   React.useEffect(() => {
      if (setMDEValue) {
         setMDEValue(value); //for comment
      } else {
         dispatch(setMDEValueToStore(value)); //for postData to publish or edit
      }
   }, [value, dispatch, setMDEValue]);

   React.useEffect(() => {
      if (uploadedMDEImg.length !== 0) {
         saveToLocalStorage('uploadedMDEImg', JSON.stringify(uploadedMDEImg));
      }
   }, [uploadedMDEImg]);

   React.useEffect(() => {
      if (!MDEValue) {
         setValue(MDEValue);
      } // setting MDEValue to useState doesn't trigger again after initial render so I set empty string to value if it's empty
   }, [MDEValue]);

   if (isSubmitting && uploadedMDEImg.length !== 0) {
      // eslint-disable-next-line array-callback-return
      uploadedMDEImg.map((img) => {
         if (!MDEValue?.includes(img.url)) {
            removeImage(img.path).catch((err) => console.log(err));
         }
      });

      setUploadedMdeImg([]);
      removeFromLocalStorage('uploadedMDEImg');
   }

   React.useEffect(() => {
      if (isSubmitting) {
         document.querySelector('.mde-text').disabled = true;
      } else {
         document.querySelector('.mde-text').disabled = false;
      }
   }, [isSubmitting]);

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
      <Box w='100%' fontFamily='monospace'>
         <ReactMde
            commands={{
               'code-block': codeBlock,
               img_url: img,
            }}
            loadingPreview='loading...'
            toolbarCommands={customToolbarCommands()}
            value={value}
            onChange={setValue}
            selectedTab={selectedTab}
            onTabChange={setSelectedTab}
            generateMarkdownPreview={(markdown) =>
               Promise.resolve(converter().makeHtml(markdown))
            }
         />
      </Box>
   );
};

export default React.memo(MDE);
