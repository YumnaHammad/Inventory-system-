"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const SessionDebug = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log("Session Status:", status);
    console.log("Session Data:", session);
  }, [session, status]);

  if (process.env.NODE_ENV !== "development") {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded bg-black/80 p-2 text-xs text-white">
      <div>Status: {status}</div>
      <div>Role: {session?.user?.role || "none"}</div>
      <div>Email: {session?.user?.email || "none"}</div>
    </div>
  );
};

export default SessionDebug;
