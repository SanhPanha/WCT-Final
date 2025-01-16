import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  sendEmailVerification,
  updatePassword,
  signInWithPopup,
  GoogleAuthProvider,
  FacebookAuthProvider,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "@/lib/firebase/firebaseConfiguration";
import { getFirestore, doc, setDoc } from "firebase/firestore";

const db = getFirestore();

interface FirebaseAuthError extends Error {
  code: string;
}

const getErrorMessage = (error: FirebaseAuthError): string => {
  switch (error.code) {
    case "auth/email-already-in-use":
      return "The email is already in use. Please use a different email.";
    case "auth/user-not-found":
      return "No account found with the provided email.";
    case "auth/wrong-password":
      return "Incorrect password. Please try again.";
    case "auth/invalid-email":
      return "The email address is not valid.";
    case "auth/too-many-requests":
      return "Too many attempts. Please try again later.";
    default:
      return "An unexpected error occurred. Please try again later.";
  }
};

const createUserInFirestore = async (user: User): Promise<void> => {
  const userDocRef = doc(db, "users", user.uid);
  await setDoc(
    userDocRef,
    {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      createdAt: new Date().toISOString(),
    },
    { merge: true }
  );
};

export const doCreateUserWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(getErrorMessage(error as FirebaseAuthError));
  }
};

export const doSignInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error signing in with email and password:", error);
    throw new Error(getErrorMessage(error as FirebaseAuthError));
  }
};

export const doSignInWithGoogle = async (): Promise<User> => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await createUserInFirestore(user);
    return user;
  } catch (error) {
    console.error("Error signing in with Google:", error);
    throw new Error(getErrorMessage(error as FirebaseAuthError));
  }
};

export const doSignInWithFacebook = async (): Promise<User> => {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    await createUserInFirestore(user);
    return user;
  } catch (error) {
    console.error("Error signing in with Facebook:", error);
    throw new Error(getErrorMessage(error as FirebaseAuthError));
  }
};

// Other functions (sign out, password reset, etc.) remain unchanged
