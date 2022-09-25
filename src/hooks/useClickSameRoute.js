import { useEffect, useState } from 'react';

const useClickSameRoute = () => {
   const [sameRoute, setSameRoute] = useState(false);

   useEffect(() => window.scrollTo(0, 0), [sameRoute]);

   const handleSameRoute = () => setSameRoute((prev) => !prev);

   return handleSameRoute;
};

export default useClickSameRoute;
