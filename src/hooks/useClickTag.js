import { useNavigate } from 'react-router-dom';

const useClickTag = (handleSameRoute, onClose) => {
   const navigate = useNavigate();

   const handleClickTag = (e, tagName) => {
      e.stopPropagation();
      navigate(`/tags/${tagName}`);

      handleSameRoute && handleSameRoute();
      onClose && onClose();
   };

   return handleClickTag;
};

export default useClickTag;
