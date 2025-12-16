"use client";
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "@/components/header/ThemeToggle";
import Image from "next/image";
import CloseIcon from "@/components/icons/CloseIcon";
import logoLight from "@/public/logo/tuservicio-light.svg";
import logoDark from "@/public/logo/tuservicio-dark.svg";
import HamburguerIcon from "@/components/icons/HamburgueIcon";
import HomeIcon from "@/components/icons/HomeIcon";
import { useTheme } from "@/context/ThemeContext";

function Header() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const handleSideBar = () => {
    setIsOpen(!isOpen);
  }
  return (

    <section className="header-section flex flex-row w-full lg:h-28 h-18 items-center justify-between lg:pl-15 lg:pr-25">
      {/* LOGO */}
      <Image
        src={theme === "light" ? logoLight : logoDark}
        alt="logo-header"
        width={300}
        height={300}
        loading="eager"
        className="w-50 h-12 lg:w-70 lg:h-16" />
      {/* ICON HOME
          <HomeIcon
            alt="home-icon"
            width={100}
            height={100}
            loading="eager"
            className="link-home w-5 h-5 text-very-dark-blue" /> */}

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
        <div className="icon-login border-4 border-brand-primary w-9 lg:w-12 h-9 lg:h-12 rounded-full hover:border-brand-secondary ">

        </div>
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
        <HamburguerIcon
          className="text-dark-grayish-blue w-10"
          alt="icon-hamburger" />
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
          <CloseIcon
            alt="icon-close"
            className={isOpen ? "icon-close h-5 w-5 text-fontColor mb-8 ml-40" : ""}
            onClick={handleSideBar} />
          {/* AVATAR LOGIN */}
          <div className="icon-login border-4 border-brand-primary w-9 lg:w-12 h-9 lg:h-12 rounded-full hover:border-brand-secondary ">

          </div>
          <Link href="/register">Register</Link>
          <Link href="/login">Login</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <ThemeToggle />

          <Link href={"/"}>
            <HomeIcon
              alt="home-icon"
              width={100}
              height={100}
              loading="eager"
              className="link-home w-6 h-6 text-very-dark-blue" />
          </Link>
        </div>
      </nav>

    </section>

  );
}
export default Header;