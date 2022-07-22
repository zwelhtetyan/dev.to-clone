import styled from 'styled-components';

export const HeroCon = styled.div`
   max-width: 560px;
   margin: 1rem auto;
`;

export const ContentWrapper = styled.div`
   display: flex;
   align-items: flex-start;
   justify-content: center;

   img {
      width: 60px;
      height: 45px;
      transform: rotate(-10deg);
      margin: 0.5rem 1rem 0 0;
   }

   h2 {
      font-size: 2rem;

      span {
         color: rgb(59 73 223);
         cursor: pointer;
         &:hover {
            text-decoration: underline;
         }
      }
   }

   p {
      color: rgb(64 64 64);
      font-weight: 300;
      font-size: 15px;
      margin-top: 5px;
   }
`;
