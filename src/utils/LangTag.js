import styled from 'styled-components';

const Tag = styled.div`
   width: auto;
   height: 27px;
   border: 1px solid transparent;
   border-radius: 5px;
   display: inline-flex;
   text-align: center;
   align-items: center;
   padding: 0 0.3rem;
   cursor: pointer;
   font-size: 13px;
   user-select: none;

   /* margin: 0 0.5rem 0.5rem 0; */
   margin: ${({ m }) => m || '0 0.5rem 0.5rem 0'};

   box-shadow: 0 0 0 1px ${({ color }) => color};
   background-color: ${({ bg }) => bg};
   background-color: ${({ theme }) => theme.foreBg};

   &:hover {
      background-color: rgb(0 0 0 / 4%);
   }
`;

const LangTag = ({ children, handleClickTag, ...props }) => {
   return (
      <Tag {...props} onClick={handleClickTag}>
         {children}
      </Tag>
   );
};

export default LangTag;
