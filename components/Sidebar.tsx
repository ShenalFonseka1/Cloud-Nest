"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { avatarPlaceholderUrl, navItems } from "@/constants";
import { cn } from "@/lib/utils";

interface Props {
  fullName: string;
  avatar: string;
  email: string;
}

const Sidebar = ({ fullName, avatar, email }: Props) => {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <Link href="/">
        <Image
          src={"/assets/icons/logo-full-brand.svg"}
          alt={"logo"}
          width={270}
          height={90}
          className="hidden h-auto lg:block"
        />
        <Image
          src="/assets/icons/logo-brand.svg"
          alt="logo"
          width={53}
          height={53}
          className="lg:hidden"
        />
      </Link>
      <nav className="sidebar-nav">
        <ul className="flex flex-1 flex-col gap-6"></ul>
        {navItems.map(({ url, name, icon }) => (
          <Link key={name} href={url} className="lg:w-full">
            <li
              className={cn(
                "sidebar-nav-item",
                pathname === url && "shad-active",
              )}
            >
              <Image
                src={icon}
                alt={name}
                width={25}
                height={25}
                className={cn(
                  "nav-icon",
                  pathname === url && "nav-icon-active",
                )}
              />
              <p className="hidden lg:block">{name}</p>
            </li>
          </Link>
        ))}
      </nav>

      <div className="sidebar-user-info">
        <Image
          src={avatarPlaceholderUrl}
          alt="avatar"
          width={40}
          height={40}
          className="sidebar-user-avatar"
        />

        <div className="hidden lg:block">
          {" "}
          <p className="subtitle-2 capitalize">{fullName}</p>
          <p className="caption">{email}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
