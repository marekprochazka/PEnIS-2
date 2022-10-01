import type { ILog } from "@/database/TimeLog/interfaces";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "@/firebase";
import type { QueryConstraint } from "@firebase/firestore";

export default async (filter: QueryConstraint[]): Promise<ILog[]> => {
  const q = query(collection(db, "logs"), ...filter);
  const querySnapshot = await getDocs(q);
  const logs: ILog[] = [];
  querySnapshot.forEach((doc) => {
    const data = { id: doc.id, ...doc.data() } as ILog;
    logs.push(data);
  });
  return logs;
};
