"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
type Props = {};

const Nav = (props: Props) => {
  const userLoggedIn = true;
  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image
          src="/assets/images/logo.svg"
          width={60}
          height={60}
          alt="PromptyDumpy logo"
          className="object-contain"
        />
        <p className="logo_text">PromptyDumpty</p>
      </Link>

    </nav>
  );
};

export default Nav;
