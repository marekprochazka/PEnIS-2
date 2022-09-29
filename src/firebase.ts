import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { userStorePostLoaded } from "@/main";
import { getUserCredentials } from "@/utils";
import router from "@/router";
import { ROUTES } from "@/constants";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    userStorePostLoaded().setUser(getUserCredentials());
    if (router.currentRoute.value.path === ROUTES.LOGIN.path) {
      const nextUrl =
        router.currentRoute.value.query.nextUrl?.toString() ?? ROUTES.HOME.path;
      router.push(nextUrl);
    }
  } else {
    userStorePostLoaded().clearUser();
  }
});

export { db, auth };
