import type { ILog } from "@/database/TimeLog/interfaces";
import { setDoc, doc } from "firebase/firestore";
import { v4 } from "uuid";
import { db } from "@/firebase";

export default async (log: ILog): Promise<void> => {
  await setDoc(doc(db, "logs", v4().toString()), {
    ...log,
    date: log.date.toISOString(),
  });
};
