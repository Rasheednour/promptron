"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import { list } from "postcss";
type Props = {};

// add provider type to be used in getProviders function
type Provider = {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  [key: string]: any;
};

const Nav = (props: Props) => {
  // keep track of user login status
  const userLoggedIn: boolean = true;

  const [providers, setProviders] = useState<Record<string, Provider> | null>(
    null
  );
  const [activeDropdown, setAcvtiveDropdown] = useState<Boolean>(false);

  useEffect(() => {
    const setProvider = async () => {
      const response: Record<string, Provider> | null = await getProviders();
      setProviders(response);
    };
    setProvider();
  }, []);
  // function to handle signOut event
  const handleSignOut = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await signOut({ callbackUrl: "http://localhost:3000" });
    } catch (error) {
      console.error("Sign out failed", error);
    }
  };

  // function to handle signIn even
  const handleSignIn = async (
    event: React.MouseEvent<HTMLButtonElement>,
    providerName: string
  ) => {
    event.preventDefault();
    try {
      await signIn(providerName);
    } catch (error) {
      console.error("Sign in failed", error);
    }
  };

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

      {/* Desktop Navigation */}

      <div className="sm:flex hidden">
        {userLoggedIn ? (
          <div className="flex gap-3 md:gap-5">
            <Link href="/create-prompt" className="black_btn">
              Create Post
            </Link>
            <button
              type="button"
              onClick={handleSignOut}
              className="outline_btn"
            >
              Sign Out
            </button>
            <Link href="/profile">
              <Image
                src="/assets/images/logo.svg"
                width={37}
                height={37}
                className="rounded-full"
                alt="profile picture"
              />
            </Link>
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={(e) => handleSignIn(e, provider.name)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>

      {/* Mobile Navigation */}

      <div className="sm:hidden flex relative">
        {userLoggedIn ? (
          <div className="flex">
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className="rounded-full"
              alt="profile picture"
              onClick={() => setAcvtiveDropdown((prev) => !prev)}
            />
            {activeDropdown && (
              <div className="dropdown">
                <Link
                  href="/profile"
                  className="dropdown_link"
                  onClick={() => setAcvtiveDropdown(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/create-prompt"
                  className="dropdown_link"
                  onClick={() => setAcvtiveDropdown(false)}
                >
                  Create Prompt
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setAcvtiveDropdown(false);
                    signOut();
                  }}
                  className="mt-5 w-full black_btn"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider) => (
                <button
                  type="button"
                  key={provider.name}
                  onClick={(e) => handleSignIn(e, provider.name)}
                >
                  Sign In
                </button>
              ))}
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
