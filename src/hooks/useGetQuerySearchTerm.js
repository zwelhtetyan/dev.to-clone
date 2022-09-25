import { useLocation } from 'react-router-dom';

const useGetQuerySearchTerm = (queryName) => {
   const location = useLocation();

   const queryParam = new URLSearchParams(location.search);
   const querySearchTerm = queryParam.get(queryName);

   return querySearchTerm;
};

export default useGetQuerySearchTerm;
