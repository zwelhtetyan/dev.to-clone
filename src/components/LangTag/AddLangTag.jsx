import React, { useEffect, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import LangTag from '../../utils/LangTag';
import { useDispatch } from 'react-redux';
import { Box, Circle, Input, Square, Wrap, WrapItem } from '@chakra-ui/react';
import tagsData from './LangTagData.json';
import { setTagsToStore } from '../../store/post/postData';
import { nanoid } from 'nanoid';

const AddLangTag = ({ filteredTagsFromLocalStorage }) => {
   //states
   const [tagData, setTagData] = useState(tagsData);
   const [filterTagName, setFilterTagName] = useState('');
   const [focusTagInput, setFocusTagInput] = useState(false);
   const [filteredTags, setFilteredTags] = useState(
      filteredTagsFromLocalStorage || []
   );

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(setTagsToStore(filteredTags));
   }, [filteredTags, dispatch]);

   //refs
   const inputTagRef = useRef();

   //showing tag suggestion
   const tagsToShow = () => {
      if (filterTagName === '') {
         return;
      }

      const searchedTags = tagData.filter((tag) =>
         tag.topic.toLowerCase().includes(filterTagName.toLowerCase())
      );

      return searchedTags;
   };

   const filteredTagsToShow = () => {
      const tags = filteredTags.map((tag) => (
         <WrapItem
            key={nanoid()}
            pos='relative'
            margin='.6rem .3rem !important'
         >
            <LangTag tag={tag} />
            <Square
               pos='absolute'
               cursor='pointer'
               w='25px'
               h='25px'
               top='-13'
               right='-9px'
               bg='transparent'
               onClick={() => handleDeleteTag(tag)}
            >
               <Circle
                  w='15px'
                  h='15px'
                  bg='black'
                  color='white'
                  _hover={{ bg: 'red' }}
               >
                  <IoCloseOutline />
               </Circle>
            </Square>
         </WrapItem>
      ));

      return tags;
   };

   const addToFilteredTags = (tag) => {
      setFilteredTags((prevArr) => [...prevArr, tag]);
      setTagData((prevArr) =>
         prevArr.filter((item) => item.topic !== tag.topic)
      );
   };

   const handleAddLangTag = (tag) => {
      addToFilteredTags(tag);
      setFilterTagName('');
      inputTagRef.current.focus();

      setTimeout(() => setFocusTagInput(true), 100); // this action and (line-140's action) trigger once, always false and can't show suggestion box again;
   };

   const handleDeleteTag = (tag) => {
      setFilteredTags((prevArr) =>
         prevArr.filter((item) => item.topic !== tag.topic)
      );

      if (tag.isCustomTag) {
         return;
      }

      setTagData((prevArr) => [...prevArr, tag]);
   };

   // generating tag icon
   const suggestions = () => {
      if (!tagsToShow() || tagsToShow().length === 0) {
         // return <p>No tag found !</p>;
         const customTag = { topic: filterTagName, isCustomTag: true };
         return (
            <WrapItem>
               <LangTag
                  handleClickTag={() => handleAddLangTag(customTag)}
                  tag={customTag}
                  cursor='pointer'
               />
            </WrapItem>
         );
      } else if (tagsToShow()) {
         return tagsToShow().map((tag) => (
            <WrapItem key={nanoid()}>
               <LangTag
                  handleClickTag={() => handleAddLangTag(tag)}
                  tag={tag}
                  cursor='pointer'
               />
            </WrapItem>
         ));
      }
   };

   // showSuggestionBox
   const showSuggestionBox = focusTagInput && tagsToShow() ? 'flex' : 'none';

   //global click event to close suggestion box
   document.body.addEventListener('click', (e) => {
      e.stopPropagation();

      if (
         e.target.classList.contains('suggestion-box') ||
         e.target.classList.contains('tag-input')
      ) {
         setFocusTagInput(true);
      } else {
         setFocusTagInput(false);
      }
   });

   const tagInputPlaceHolder = `Add tag ( ${4 - filteredTags.length} )`;

   return (
      <>
         <Box mb={3}>
            <Wrap overflow='visible'>
               {filteredTagsToShow()}

               {filteredTags.length !== 4 && (
                  <WrapItem maxW='120px'>
                     <Input
                        h='34px'
                        w='100%'
                        variant='flushed'
                        _focus={{ borderColor: '#e2e8f0', boxShadow: 'none' }}
                        className='tag-input'
                        ref={inputTagRef}
                        placeholder={tagInputPlaceHolder}
                        borderRadius='5px'
                        _placeholder={{ color: '#525252' }}
                        value={filterTagName}
                        onChange={({ target }) =>
                           setFilterTagName(target.value)
                        }
                     />
                  </WrapItem>
               )}
            </Wrap>
         </Box>

         <Wrap
            display={showSuggestionBox}
            w='100%'
            bg='white'
            className='suggestion-box'
            m='0 auto 1rem'
            p={3}
            overflow='auto'
            border='1px solid rgb(214, 214, 215)'
            borderRadius='5px'
            maxH='7.9rem'
         >
            {suggestions()}
         </Wrap>
      </>
   );
};

export default React.memo(AddLangTag);
