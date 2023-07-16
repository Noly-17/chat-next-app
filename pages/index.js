import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { auth, db, ref, onValue, set } from "@/config/firebase";
import { config, signIn, signUp, signOut } from "@/config/firebase";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the chat page if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        router.push("/chat");
      } else {
        router.push("/sign-in");
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  return null;
}
