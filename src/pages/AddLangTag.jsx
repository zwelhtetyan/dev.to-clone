import React, { useCallback, useRef, useState } from 'react';
import { IoCloseOutline } from 'react-icons/io5';
import {
   CircleClose,
   SingleTag,
   SuggestionBox,
   TagContainer,
   TagInput,
} from '../styles/AddLangTagStyle';
import LangTag from '../utils/LangTag';
import tagsData from '../components/LangTag/LangTagData.json';

const AddLangTag = () => {
   //states
   const [filterTagName, setFilterTagName] = useState('');
   const [focusTagInput, setFocusTagInput] = useState(false);
   const [filteredTags, setFilteredTags] = useState([]);

   //refs
   const inputTagRef = useRef();

   //showing tag suggestion
   const tagsToShow = () => {
      if (filterTagName === '') {
         return;
      }

      const filteredTags = tagsData.filter((tag) =>
         tag.lang.toLowerCase().includes(filterTagName.toLowerCase())
      );

      return filteredTags;
   };

   const addToFilteredTags = (tag) => {
      setFilteredTags((prevArr) => [...prevArr, tag]);
   };

   const filteredTagsToShow = useCallback(() => {
      const tags = filteredTags.map((tag) => (
         <SingleTag key={tag.id}>
            <LangTag color={tag.color} m='0 0.8rem 0.5rem 0'>
               {tag.lang}
            </LangTag>
            <div className='wrapper' onClick={() => handleDeleteTag(tag.id)}>
               <CircleClose>
                  <IoCloseOutline />
               </CircleClose>
            </div>
         </SingleTag>
      ));

      return tags;
   }, [filteredTags]);

   const handleAddLangTag = (tag) => {
      addToFilteredTags(tag);
      setFilterTagName('');
      inputTagRef.current.focus();

      setTimeout(() => setFocusTagInput(true), 100); // this action and (line-99's action) trigger once, always false and can't show suggestion box again;
   };

   const handleDeleteTag = (id) => {
      setFilteredTags((prevArr) => prevArr.filter((tag) => tag.id !== id));
   };

   // generating tag pill icon
   const suggestions = () => {
      if (!tagsToShow() || tagsToShow().length === 0) {
         return <p>No tag found !</p>;
      } else if (tagsToShow()) {
         return tagsToShow().map((tag) => (
            <LangTag
               color={tag.color}
               key={tag.id}
               handleClickTag={() => handleAddLangTag(tag)}
            >
               {tag.lang}
            </LangTag>
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

   const tagInputPlaceHolder = `Add tag ( ${4 - filteredTags.length} ) ...`;

   return (
      <TagContainer>
         {filteredTagsToShow()}

         {filteredTags.length !== 4 && (
            <SingleTag>
               <TagInput
                  className='tag-input'
                  ref={inputTagRef}
                  placeholder={tagInputPlaceHolder}
                  value={filterTagName}
                  onChange={({ target }) => setFilterTagName(target.value)}
               />
            </SingleTag>
         )}

         <SuggestionBox d={showSuggestionBox} className='suggestion-box'>
            {suggestions()}
         </SuggestionBox>
      </TagContainer>
   );
};

export default AddLangTag;
