import { db } from "@/firebase";
import { setDoc, doc } from "firebase/firestore";
import { v4 } from "uuid";

export default async (name: string): Promise<void> => {
  await setDoc(doc(db, "logGroups", v4().toString()), {
    name,
  });
};
