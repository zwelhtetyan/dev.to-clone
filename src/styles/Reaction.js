import styled from 'styled-components';

export const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;

   div {
      display: flex;
      align-items: center;
      justify-content: space-between;
   }
`;

export const ReadTime = styled.p`
   font-size: 13px;
   color: rgb(82 82 82);
`;

export const ReactionWrapper = styled.div`
   margin-right: 1rem;
   padding: 5px 10px;
   text-align: center;
   border-radius: 5px;
   cursor: pointer;
   user-select: none;

   &:hover {
      background-color: rgb(0 0 0 / 4%);
   }

   img {
      margin-right: 0.3rem;
   }

   span {
      font-size: 14px;

      @media screen and (max-width: 480px) {
         .text {
            display: none;
         }
      }
   }
`;

export const CommenntWrapper = styled(ReactionWrapper)`
   margin-right: 0;
`;
