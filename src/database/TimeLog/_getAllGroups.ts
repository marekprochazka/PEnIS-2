import type { ILogGroup } from "@/database/TimeLog/interfaces";
import { db } from "@/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default async (): Promise<ILogGroup[]> => {
  const q = query(collection(db, "logGroups"));
  const querySnapshot = await getDocs(q);
  const logGroups: ILogGroup[] = [];
  querySnapshot.forEach((doc) => {
    logGroups.push({
      id: doc.id,
      name: doc.data().name,
    });
  });
  return logGroups;
};
