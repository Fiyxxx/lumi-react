"use client";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export default function AuthPage() {
  const [user] = useAuthState(auth);
  const googleSignIn = async () => await signInWithPopup(auth, new GoogleAuthProvider());
  const logOut = async () => await signOut(auth);

  return (
    <div className="flex flex-col items-center">
      {user ? (
        <>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logOut}>Log Out</button>
        </>
      ) : (
        <button onClick={googleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
}