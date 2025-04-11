"use client";

import React, { useEffect, useState } from "react";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { navItems } from "@/constants";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  $id: string;
  accountId: string;
  fullName: string;
  avatar: string;
  email: string;
}
// import Lottie from "lottie-react";
import FileUploader from "@/components/FileUploader";
import { signOutUser } from "@/lib/actions/user.actions";

const MobileNavigation = ({
  $id: ownerId,
  accountId,
  fullName,
  avatar,
  email,
}: Props) => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="mobile-header">
      <Image
        src="assets/icons/logo-full-brand.svg"
        alt="logo"
        width={125}
        height={55}
        className="h-auto "
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <Image
            src="assets/icons/menu.svg"
            alt="search"
            width={34}
            height={34}
          />
        </SheetTrigger>
        <SheetContent className="shad-sheet h-screen px-4">
          <SheetTitle>
            <div className="header-user">
              <Image
                src={avatar}
                alt="avatar"
                width={45}
                height={45}
                className="header-user-avatar"
              />
              <div className="sm:hidden lg:block">
                <p className="subtitle-2 capitalize">{fullName}</p>
                <p className="caption">{email}</p>
              </div>
            </div>
            <Separator className="mb-4 bg-light-200/20" />
          </SheetTitle>
          <nav className="mobile-nav">
            <ul className="mobile-nav-list">
              {navItems.map(({ url, name, icon }) => (
                <Link key={name} href={url} className="lg:w-full">
                  <li
                    className={cn(
                      "mobile-nav-item",
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
                    <p>{name}</p>
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
          <Separator className="my-5 bg-light-200/20" />
          <div className="flex flex-col justify-between gap-5">
            <FileUploader ownerId={ownerId} accountId={accountId} />
            <button
              type="submit"
              className="mobile-sign-out-button"
              onClick={async () => await signOutUser()}
            >
              <Image
                src="/assets/icons/logout.svg"
                alt="logo"
                width={35}
                height={35}
              />
              <p>Logout</p>
            </button>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default MobileNavigation;
