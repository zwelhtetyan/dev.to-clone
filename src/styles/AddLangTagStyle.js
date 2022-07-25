import styled from 'styled-components';

export const TagContainer = styled.ul`
   display: flex;
   flex-wrap: wrap;
`;

export const SingleTag = styled.li`
   list-style: none;
   max-width: 155px;
   position: relative;
   display: flex;
   align-items: center;
   justify-content: center;
   margin: 0 0.5rem 0.8rem 0;

   .wrapper {
      position: absolute;
      top: -13px;
      right: 2px;
      background: transparent;
      width: 25px;
      height: 25px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      &:hover > div {
         background: #ff3e00;
      }
   }
`;

export const CircleClose = styled.div`
   width: 15px;
   height: 15px;
   background-color: black;
   color: white;
   border-radius: 50%;
   display: flex;
   align-items: center;
   justify-content: center;
`;

export const TagInput = styled.input`
   outline: none;
   border: none;
   width: 100%;
   padding: 0 0.5rem;
   border-radius: 5px;
   font-weight: 500;
   height: 35px;
   font-size: 1rem;
   margin-bottom: 0;
   border-bottom: 1px solid #d6d6d7;

   &::placeholder {
      color: #525252;
   }
`;

export const SuggestionBox = styled.div`
   border: 2px solid #d6d6d7;
   padding: 1rem 1rem 0.5rem;
   width: 97%;
   background: ${({ theme }) => theme.foreBg};
   border-radius: 5px;
   margin-bottom: 1rem;

   display: ${({ d }) => d};
   flex-wrap: wrap;

   @media screen and (max-width: 768px) {
   }

   @media screen and (max-width: 480px) {
      padding: 1rem 1rem 0.5rem;
   }
`;
