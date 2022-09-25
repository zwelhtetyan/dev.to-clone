import { useNavigate } from 'react-router-dom';
import useClickSameRoute from './useClickSameRoute';

const useClickTag = () => {
   const navigate = useNavigate();
   const handleSameRoute = useClickSameRoute();

   const handleClickTag = (e, tagName) => {
      e.stopPropagation();
      navigate(`/tags/${tagName}`);

      handleSameRoute();
   };

   return handleClickTag;
};

export default useClickTag;
