import { useNavigate } from 'react-router-dom';

const useClickTag = (handleSameRoute) => {
   const navigate = useNavigate();

   const handleClickTag = (e, tagName) => {
      e.stopPropagation();
      navigate(`/tags/${tagName}`);

      handleSameRoute && handleSameRoute();
   };

   return handleClickTag;
};

export default useClickTag;
