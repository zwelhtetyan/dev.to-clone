import { Text } from '@chakra-ui/react';
import React from 'react';
import Moment from 'react-moment';
import {
   calTimeStamp,
   dateFormat,
   isLimitedDate,
} from '../../helper/calcTimestamp';

const DisplayDate = ({ createdAt, isUpdated }) => {
   return (
      <>
         <Text fontSize='12px' color='#717171'>
            {dateFormat(createdAt)}{' '}
            {!isLimitedDate(createdAt) && (
               <Text as='span'>
                  (<Moment fromNow>{calTimeStamp(createdAt)}</Moment>)
               </Text>
            )}{' '}
            {isUpdated && (
               <Text fontSize='11px' color='#717171' as='span'>
                  •{' '}
                  <Text as='span' rounded='sm' px='3px'>
                     updated
                  </Text>
               </Text>
            )}
         </Text>
      </>
   );
};

export default DisplayDate;
