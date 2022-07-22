import styled from 'styled-components';

export const PrimaryBtn = styled.div`
   margin: ${({ margin }) => margin};
   min-width: ${({ w }) => w};
   background: ${({ bg }) => bg};
   color: ${({ color }) => color};
   height: 40px;
   display: flex;
   align-items: center;
   justify-content: center;
   cursor: pointer;
   border: 1px solid rgb(59 73 223);
   border-radius: 5px;
   padding: 0 0.5rem;
   user-select: none;

   &:hover {
      background-color: rgb(37 52 213);
      color: #ffffff;
   }
`;

export const SecondaryBtn = styled(PrimaryBtn)`
   border: none;
   color: black;
   &:hover {
      color: rgb(47 58 178);
      background-color: rgb(59 73 223 / 10%);
   }
`;
