import styled from 'styled-components';

const Tag = styled.div`
   width: auto;
   height: 28px;
   border: 1px solid transparent;
   border-radius: 5px;
   display: inline-flex;
   text-align: center;
   align-items: center;
   padding: 0 0.5rem;
   cursor: pointer;
   font-size: 13px;
   user-select: none;

   /* default =>  margin: 0 0.5rem 0.5rem 0; */
   margin: ${({ m }) => m || '0 0.5rem 0.5rem 0'};

   border: 1px solid rgb(0 0 0 / 4%);
   border-bottom: 0.3px solid ${({ color }) => color};

   background-color: ${({ theme }) => theme.foreBg};

   img {
      width: 15px;
      margin-right: 5px;
   }

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
