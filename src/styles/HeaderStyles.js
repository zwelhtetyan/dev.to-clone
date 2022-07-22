import styled from 'styled-components';

export const Header = styled.header`
   background-color: ${({ theme }) => theme.foreBg};
   width: 100%;
   height: 56px;
   position: fixed;
   top: 0;
   left: 0;
   padding: 0 2rem;
   box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
   z-index: 99;

   @media screen and (max-width: 480px) {
      padding: 0.5rem;
   }
`;

export const Wrapper = styled.div`
   max-width: 1280px;
   margin: auto;
   height: 100%;
   display: flex;
   align-items: center;
   justify-content: space-between;
`;

export const HeaderLeft = styled.div`
   display: flex;
   align-items: center;

   .menu-icon {
      display: none;
   }

   @media screen and (max-width: 768px) {
      .menu-icon {
         display: flex;
      }
   }
`;

export const Logo = styled.img`
   width: 58px;
   height: 40px;
   transition: 0.3s;
   cursor: pointer;
`;

export const InputWrapper = styled.div`
   width: 400px;
   margin-left: 1rem;
   position: relative;

   .search-icon-inside-input {
      position: absolute;
      right: 10px;
      top: 7px;
   }

   @media screen and (max-width: 768px) {
      display: none;
   }
`;

export const Input = styled.input`
   border: 1px solid #c3c2c2;
   width: 100%;
   height: 39px;
   -webkit-appearance: none;
   text-indent: 0.5rem;
   font-size: 16px;
   border-radius: 5px;

   &:focus {
      outline-color: rgb(59 73 223);
   }
`;

export const HeaderRight = styled(HeaderLeft)`
   .search-icon {
      display: none;
   }

   @media screen and (max-width: 768px) {
      .search-icon {
         display: flex;
      }
      .login {
         display: none;
      }
   }

   @media screen and (max-width: 480px) {
      .create-post {
         display: none;
      }
   }
`;

export const ProfileAvatar = styled.div`
   margin-left: 1rem;
   transition: 0.3s;
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background: url(${({ img }) => img}) no-repeat;
   background-size: cover;
   background-position: center;
   overflow: hidden;
   cursor: pointer;

   &:hover {
      box-shadow: 0 0 0 2px rgb(59 73 223);
   }
`;
