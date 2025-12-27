"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/header/ThemeToggle";
import Image from "next/image";

import logoLight from "@/public/logo/tuservicio-light.svg";
import logoDark from "@/public/logo/tuservicio-dark.svg";

import { useTheme } from "@/context/ThemeContext";
import { CircleX, House, Menu, UserLock } from "lucide-react";
import Avatar from "../ui/Avatar";
import Logo from "@/components/icons/Logo";

function Header() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  }
  return (

    <section className="header-section flex flex-row w-full lg:h-28 h-18 items-center justify-between lg:pl-15 lg:pr-25">
      {/* LOGO */}
    <Logo/>

      {/*NAVBAR DESKTOP */}
      <nav className="nav hidden lg:flex lg:flex-row gap-9 items-center w-1/2 justify-end ">
        <Link href={"/"}>
          <ThemeToggle />
        </Link>
        <Link href="/about" className="hover:text-brand-secondary">About</Link>
        <Link href="/contact" className="hover:text-brand-secondary">Contact</Link>
        <Link href="/login" className="hover:text-brand-secondary">Login</Link>
        <Link href="/register" className="hover:text-brand-secondary">Register</Link>

        {/* AVATAR LOGIN */}
       <Avatar/>


      </nav>
      {/* HAMBURGER Button*/}
      <button
        data-collapse-toggle="navbar-hamburger"
        aria-controls="navbar-hamburger"
        aria-expanded="false"
        className={isOpen ? "button-hamburger hidden" : `button-hamburger lg:hidden flex items-center justify-center pl-6 pt-1`}
        type="button"
        onClick={handleSideBar}
      >

        <Menu
          className="text-gray-icon w-10"
        />
      </button>

      {/* SIDEBAR mobile */}
      <nav
        id="navbar-hamburger"
        className={`nav-mobile lg:hidden fixed h-full w-60  top-0 right-0 z-50 bg-background shadow-lg
          ${isOpen
            ? "translate-x-0"
            : "translate-x-full opacity-0 pointer-events-none"
          }
          transition-all duration-200 ease-in-out`}
      >
        <div className="nav-products flex flex-col gap-6 p-8 font-bold">
          {/* icon-close*/}
          <CircleX
            className={isOpen ? "icon-close h-5 w-5 text-gray-icon mb-8 ml-40" : ""}
            onClick={handleSideBar} />
          {/* AVATAR LOGIN */}
          <Avatar/>

          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <ThemeToggle />

          <Link href={"/"}>
            <House />
          </Link>
        </div>
      </nav>

    </section>

  );
}
export default Header;