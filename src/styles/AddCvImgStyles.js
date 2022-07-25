import styled from 'styled-components';

export const Wrapper = styled.div`
   display: flex;
   flex-wrap: wrap;
   align-items: center;
   justify-content: flex-start;
   margin-bottom: 1.5rem;

   & > div {
      display: flex;
      margin-top: 0.5rem;
   }

   img {
      width: 250px;
      height: 105px;
      object-fit: scale-down;
      margin-right: 1rem;
   }
`;

export const ImgUpload = styled.label`
   text-align: center;
   padding: 10px;
   border-radius: 5px;
   cursor: pointer;
   border: 2px solid #d6d6d7;
   margin-right: 0.5rem;

   &:hover {
      background-color: #d6d6d77a;
   }

   input[type='file'] {
      display: none;
   }
`;
