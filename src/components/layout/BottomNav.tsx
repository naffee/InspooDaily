"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { href: "/", label: "Home", icon: "home_app_logo" },
    { href: "/categories", label: "Categories", icon: "explore" },
    { href: "/about", label: "About me", icon: "person" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-8 pt-4 bg-surface/80 backdrop-blur-xl shadow-[0px_-4px_24px_rgba(0,0,0,0.04)] rounded-t-xl md:hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href}
            href={item.href} 
            className={`flex flex-col items-center justify-center transition-all duration-500 px-3 py-1 rounded-lg ${
              isActive ? "text-primary scale-110" : "text-on-surface/40 hover:bg-surface-container/50 font-medium"
            }`}
          >
            <span 
              className="material-symbols-outlined" 
              style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
            >
              {item.icon}
            </span>
            <span className="font-manrope uppercase tracking-[0.05rem] text-[10px] font-bold mt-1">
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
