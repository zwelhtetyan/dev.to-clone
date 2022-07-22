import styled from 'styled-components';

const Divider = styled.div`
   width: ${({ w }) => w};
   height: ${({ h }) => h};
   background-color: ${({ bg }) => bg};
`;

const DividerElem = (props) => {
   return <Divider {...props} />;
};

export default DividerElem;
