import { Text } from '@chakra-ui/react';
import React from 'react';
import Moment from 'react-moment';
import {
   calTimeStamp,
   dateFormat,
   isLimitedDate,
} from '../../helper/calcTimestamp';

const DisplayDate = ({ createdAt, isUpdated, color }) => {
   return (
      <>
         <Text fontSize='12px' color={color}>
            {dateFormat(createdAt)}{' '}
            {!isLimitedDate(createdAt) && (
               <Text as='span'>
                  (<Moment fromNow>{calTimeStamp(createdAt)}</Moment>)
               </Text>
            )}{' '}
            {isUpdated && (
               <Text fontSize='11px' as='span'>
                  •{' '}
                  <Text as='span' rounded='sm' px='3px'>
                     Updated
                  </Text>
               </Text>
            )}
         </Text>
      </>
   );
};

export default DisplayDate;
