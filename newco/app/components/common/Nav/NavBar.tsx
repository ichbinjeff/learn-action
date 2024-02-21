"use client";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";
import Button from "../Button";

import { INavBarProps } from "./types";

// Default hotzone click handler
function scrollToLearMore() {
  const el = document.getElementById("contact-us");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

export default function NavBar({
  buttonColor,
  heightClass = "h-[128px]",
  logo = "/a8logo_new.svg",
  logoAltText = "Articul8 Logo",
  navLinks,
  current,
  hotzoneText = "Contact Us",
  hotzoneOnClick = scrollToLearMore
}: INavBarProps) {
  return (
    <div
      className={`flex flex-row items-center justify-between content-container py-6 ${heightClass}`}>
      {/* Logo */}
      <Link href="/">
        <div className="h-[38px]">
          <img className="h-[38px]" src={logo} alt={logoAltText} />
        </div>
      </Link>

      {/* Page Links */}
      <div className="hidden md:flex flex-row items-center gap-5">
        {navLinks.map((link, idx) => (
          <Link
            className={`button-secondary ${
              current?.toUpperCase() === link?.text?.toUpperCase()
                ? "border-underline"
                : ""
            }`}
            key={idx}
            href={link.href}>
            {link.text}
          </Link>
        ))}
        {/* Hotzone */}
        <div className="w-11">
          <Button
            className="default-border"
            onClick={hotzoneOnClick}
            text={hotzoneText}
          />
        </div>
      </div>

      <div className="md:hidden">
        <BurgerMenu
          buttonColor={buttonColor}
          navLinks={navLinks}
          hotzoneOnClick={hotzoneOnClick}
          hotzoneText={hotzoneText}
        />
      </div>
    </div>
  );
}
