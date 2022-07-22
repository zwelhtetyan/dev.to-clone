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
               <LangTag color='#F0DB4F'>#Javascript</LangTag>
               <LangTag color='lightblue'>#React</LangTag>
               <LangTag color='green'>#Mongodb</LangTag>
               <LangTag color='blue'>#Typescript</LangTag>
            </TagWrapper>
         </Body>
         <Footer>
            <Reaction />
         </Footer>
      </PostItemCon>
   );
};

export default PostItem;
