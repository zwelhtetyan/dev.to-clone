import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';

const useGetData = (colName) => {
   const [data, setData] = useState(null);
   const [loading, setloading] = useState(true);
   const [err, setErr] = useState(false);

   useEffect(() => {
      let colRef;

      if (colName === 'posts') {
         colRef = collection(db, 'posts');
      } else if (colName === 'users') {
         colRef = collection(db, 'users');
      }

      onSnapshot(colRef, { includeMetadataChanges: true }, (snapshot) => {
         if (!snapshot.metadata.hasPendingWrites) {
            if (snapshot.docs.length === 0) {
               setloading(false);
               setErr(true);

               return;
            }

            setloading(false);
            setErr(false);

            const newData = [];
            snapshot.docs.forEach((doc) => {
               newData.push({ ...doc.data(), id: doc.id });
            });

            setData(newData);
         }
      });
   }, [colName]);

   return { data, loading, err };
};

export default useGetData;
