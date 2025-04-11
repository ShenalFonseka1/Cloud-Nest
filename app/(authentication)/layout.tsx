"use client";

import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="flex min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/Background.jpg')" }}
    >
      {children}
    </div>
  );
};

export default Layout;
