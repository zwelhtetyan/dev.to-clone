import React from 'react';
import {
   Header,
   HeaderLeft,
   HeaderRight,
   Input,
   Logo,
   Wrapper,
   InputWrapper,
   ProfileAvatar,
} from '../styles/HeaderStyles';
import logo from '../assets/logo/logo.png';
import { PrimaryBtn, SecondaryBtn } from '../utils/Buttons';
import { FiSearch } from 'react-icons/fi';
import { AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import z from '../assets/images/z.jpeg';

const MainNavigation = ({ onToggle }) => {
   const navigate = useNavigate();

   return (
      <Header>
         <Wrapper>
            <HeaderLeft>
               <SecondaryBtn
                  margin='0 0.5rem 0 0 '
                  className='menu-icon'
                  onClick={onToggle}
               >
                  <AiOutlineMenu size={23} />
               </SecondaryBtn>
               <Logo src={logo} />
               <InputWrapper>
                  <Input placeholder='Search...' />
                  <FiSearch
                     size={23}
                     color='gray'
                     className='search-icon-inside-input'
                  />
               </InputWrapper>
            </HeaderLeft>
            <HeaderRight>
               <SecondaryBtn className='search-icon'>
                  <FiSearch size={23} />
               </SecondaryBtn>
               {/* <SecondaryBtn className='login'>Log in</SecondaryBtn> */}
               {/* <PrimaryBtn
                  margin='0 0 0 0.5rem'
                  w='128px'
                  color='rgb(59 73 223)'
               >
                  Create Account
               </PrimaryBtn> */}
               <PrimaryBtn
                  margin='0 0 0 0.5rem'
                  w='128px'
                  color='rgb(59 73 223)'
                  className='create-post'
                  onClick={() => navigate('/create-post')}
               >
                  Create Post
               </PrimaryBtn>
               <ProfileAvatar img={z} />
            </HeaderRight>
         </Wrapper>
      </Header>
   );
};

export default MainNavigation;
