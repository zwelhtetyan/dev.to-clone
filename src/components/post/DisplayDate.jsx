import { Text } from '@chakra-ui/react';
import React from 'react';
import Moment from 'react-moment';
import {
   calTimeStamp,
   dateFormat,
   isLimitedDate,
} from '../../helper/calcTimestamp';

const DisplayDate = ({ createdAt, isUpdated, isDraft }) => {
   return (
      <Text fontSize='12px' color='#717171'>
         {dateFormat(createdAt)}{' '}
         {!isLimitedDate(createdAt) && (
            <Text as='span'>
               (<Moment fromNow>{calTimeStamp(createdAt)}</Moment>)
            </Text>
         )}{' '}
         {(isUpdated || isDraft) && (
            <Text fontSize='11px' color='#717171' as='span'>
               • {isDraft && 'draft'} {isUpdated && 'updated'}
            </Text>
         )}
      </Text>
   );
};

export default DisplayDate;
