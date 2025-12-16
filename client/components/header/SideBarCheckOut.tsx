"use client";
import Link from "next/link";
import LogoIcon from "../icons/LogoIcon";
import ThemeToggle from "./ThemeToggle";
import Image from "next/image";
import avatar from "../../../public/image-avatar.png"
import IconCart from "@/src/components/icons/CartIcon";
import { useState } from "react";
import HamburguerIcon from "../icons/HamburgueIcon";
import iconClose from "../../../public/icon-close.svg";
import iconHome from "../../../public/icon-home.svg";
import HomeIcon from "../icons/HomeIcon";
import CartCard from "../cart/CardCart";
import { useCart } from "@/src/context/CartContext";

function SideBar() {
  const { items } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const totalItems = items.reduce((acc, i) => acc + i.quantity, 0);
  const handleSideBar = () => {
    setIsOpen(!isOpen);
  }
  return (

    <section className="sidebar-section flex flex-row lg:mt-10 h-18 border-b border-grayish-blue/30 items-center justify-between">
      {/*NAVBAR CARRiTO */}
      <nav className="nav-cart flex flex-row w-full lg:gap-8 gap-4 justify-between items-center p-6">
        <Link href={"/"}><LogoIcon className="logo text-foreground" alt="logo-icon" /></Link>
        <div className="flex flex-row items-center justify-between lg:w-1/4">
          {/* Avatar */}
          <Image
            src={avatar}
            alt="avatar"
            width={100}
            height={100}
            loading="eager"
            className="w-7 h-7 lg:w-10  lg:h-10" />

        <ThemeToggle />
        {/* Icon-cart */}
        <div className="icon-cart-header ">
          <IconCart className="text-dark-grayish-blue" alt="icon-cart " onClick={() => setShowCart(!showCart)} />
          {/* Content Cart */}
          {totalItems > 0 && (
            <span className="absolute lg:top-15 lg:right-64 top-5 right-8  bg-red-500 text-white text-xs font-bold rounded-full h-3 p-2 w-3 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </div>
        {/* Cart */}
        {showCart && (
          <div className="absolute lg:right-40 lg:top-35 top-20 z-50">
            <CartCard />
          </div>
        )}
        {/* HAMBURGER Button*/}
       <button
         data-collapse-toggle="navbar-hamburger"
         aria-controls="navbar-hamburger"
         aria-expanded="false"
         className={ `button-hamburger flex items-center justify-center pl-6 pt-1`}
         type="button"
         onClick={handleSideBar}
       >
         <HamburguerIcon
           className="text-dark-grayish-blue"
           alt="icon-hamburger" />
 
       </button>
       </div>
      </nav>
      {/* SIDEBAR mobile */}
      <nav
        id="navbar-hamburger"
        className={`nav-mobile fixed h-full w-60  top-0 right-0 z-50 bg-background shadow-xl
          ${isOpen
            ? "translate-x-0"
            : "translate-x-full opacity-0 pointer-events-none"
          }
          transition-all duration-200 ease-in-out`}
      >
        <div className="nav-products flex flex-col gap-6 p-8 font-bold">
          {/* icon-close*/}
          <Image src={iconClose}
            alt="icon-close"
            className={isOpen ? "icon-close h-3 w-3 text-foreground mb-8" : ""}
            onClick={handleSideBar} />
          <Link href={"/"}>
            <HomeIcon
              src={iconHome}
              alt="avatar"
              width={100}
              height={100}
              loading="eager"
              className="link-home w-6 h-6 text-very-dark-blue" />
          </Link>
          <Link href="/products">Products</Link>
          <Link href="/products/categories">Categories</Link>
          {/* select /products/category-list */}
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>

        </div>

      </nav>
    </section>

  );
}
export default SideBar;