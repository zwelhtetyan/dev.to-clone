import React from 'react';
import {
   Avatar,
   Body,
   CoverPhoto,
   Footer,
   Header,
   PostItemCon,
   TagWrapper,
   Title,
} from '../../styles/PostItemStyels';
import logo from '../../assets/logo/logo.png';
import LangTag from '../../utils/LangTag';
import Reaction from './Reaction';
import { getLogo } from '../../helper/getLogo';

const PostItem = ({ coverImg }) => {
   return (
      <PostItemCon>
         {coverImg && <CoverPhoto src={coverImg} alt='cover-photo' />}
         <Header>
            <Avatar>
               <img src={logo} alt='' />
            </Avatar>
            <div>
               <h4 className='user_name'>Zwel Htet Yan</h4>
               <p className='createdAt'>1 hour ago</p>
            </div>
         </Header>
         <Body>
            <Title>Why REACT is the most popular library.</Title>
            <TagWrapper>
               <LangTag color='gold'>
                  <img src={getLogo({ lang: 'javascript' })} alt='logo' />
                  Javascript
               </LangTag>
               <LangTag color='green'>
                  <img src={getLogo({ lang: 'mongodb' })} alt='logo' />
                  Mongodb
               </LangTag>
               <LangTag color='red'>
                  <img src={getLogo({ lang: 'svelte' })} alt='logo' />
                  Svelte
               </LangTag>
               <LangTag color='blue'>
                  <img src={getLogo({ lang: 'typescript' })} alt='logo' />
                  Typescript
               </LangTag>
            </TagWrapper>
         </Body>
         <Footer>
            <Reaction />
         </Footer>
      </PostItemCon>
   );
};

export default PostItem;
