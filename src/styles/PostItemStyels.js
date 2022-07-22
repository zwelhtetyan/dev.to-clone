import styled from 'styled-components';

export const PostItemCon = styled.article`
   padding: 1.5rem;
   border-radius: 5px;
   margin-bottom: 0.5rem;

   background-color: ${({ theme }) => theme.foreBg};

   @media screen and (max-width: 768px) {
      padding: 0.5rem;
   }
`;

export const CoverPhoto = styled.img`
   width: 100%;
   margin-bottom: 1rem;
   border-top-left-radius: 5px;
   border-top-right-radius: 5px;
`;

export const Header = styled.div`
   display: flex;

   div {
      p {
         font-size: 13px;
         color: rgb(82 82 82);
      }
   }
`;

export const Avatar = styled.div`
   width: 40px;
   height: 40px;
   border-radius: 50%;
   background-color: green;
   overflow: hidden;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-right: 5px;
   cursor: pointer;

   img {
      width: 100%;
   }
`;

export const Body = styled.div`
   margin-left: 45px;

   @media screen and (max-width: 768px) {
      margin-left: 0;
   }
`;

export const Title = styled.h1`
   margin-top: 10px;
   font-size: 1.5rem;

   @media screen and (max-width: 480px) {
      font-size: 1.3rem;
   }
`;

export const TagWrapper = styled.div`
   display: flex;
   flex-wrap: wrap;

   margin-top: 0.7rem;
`;

export const Footer = styled.div`
   margin-top: 0.5rem;
   margin-left: 45px;

   @media screen and (max-width: 768px) {
      margin-left: 0;
   }
`;
