import { useColorModeValue } from '@chakra-ui/react';

const useSkeletonColor = () => {
   const startColor = useColorModeValue(
      'rgb(23 23 23 / 5%)',
      'rgb(255 255 255 / 5%)'
   );
   const endColor = useColorModeValue(
      'rgb(23 23 23 / 20%)',
      'rgb(255 255 255 / 20%)'
   );

   const skeletonColor = { startColor, endColor };

   return skeletonColor;
};

export default useSkeletonColor;
