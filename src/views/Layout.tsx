import Navbar from "./Navbar";
import { Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function Layout() {
  const [navVisible, setNavVisible] = useState(true);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.altKey && e.code === "KeyF") {
        e.preventDefault();
        setNavVisible((v) => !v);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex h-full w-full flex-col p-1">
      <Navbar visible={navVisible} />
      <div className={cn("h-full w-full", navVisible && "p-3 pt-1")}>
        <div className="flex h-full flex-row justify-center gap-8 overflow-clip rounded-xl border-2 border-black bg-gray-200/60 dark:border-white dark:bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
