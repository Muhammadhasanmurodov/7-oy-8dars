import { useEffect, useRef, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase/config";

export const useCollection = (collectionName, ordered, _where) => {
  const [data, setData] = useState(null);
  const whereData = useRef(_where);

  useEffect(() => {
    let ref = collection(db, collectionName);
    let q = ref;

    if (whereData?.current && ordered) {
      q = query(ref, where(...whereData.current), orderBy("timestamp", "desc"));
    } else if (whereData?.current) {
      q = query(ref, where(...whereData.current));
    } else if (ordered) {
      q = query(ref, orderBy("timestamp", "desc"));
    }

    const unsubscribe = onSnapshot(q, (snapShot) => {
      const data = [];
      snapShot.forEach((doc) => {
        data.push({
          uid: doc.id,
          ...doc.data(),
        });
      });
      setData(data);
    });

    return () => unsubscribe();
  }, [collectionName, ordered, _where]);

  return { data };
};
