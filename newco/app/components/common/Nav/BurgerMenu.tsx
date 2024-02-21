import { Menu } from "@headlessui/react";
import BurgerIcon from "../../icon/BurgerIcon";
import { IBugerMenuProps, INavLink } from "./types";
import Link from "next/link";
import Button from "../Button";

const scrollToLearMore = () => {
  const el = document.getElementById("contact-us");
  if (el) {
    el.scrollIntoView({ behavior: "smooth" });
  }
};

export default function BurgerMenu({
  buttonColor,
  navLinks,
  hotzoneText = "Contact Us",
  hotzoneOnClick = scrollToLearMore
}: IBugerMenuProps) {
  const widthClass = "h-screen";
  const heightClass = "w-screen";
  const topPadding = "top-[50px]";

  const style = {
    backgroundImage: `url('/gradient.png')`,
    backgroundSize: "cover",
    backgroundPosition: "center"
  };
  const links = navLinks.map((link: INavLink, idx: number) => (
    <Menu.Item key={idx}>
      <Link
        href={link.href}
        className={`w-12 button-secondary block px-4 py-2 text-left text-white `}>
        {link.text}
      </Link>
    </Menu.Item>
  ));

  const hotzone = (
    <Menu.Item
      key="hotzone"
      as="div"
      className="flex justify-between items-center w-full">
      <Button
        text="contact us"
        className={`text-white border border-white rounded-md py-2 px-4`}
        onClick={hotzoneOnClick}
      />
    </Menu.Item>
  );

  return (
    <Menu as="div" className="relative">
      <Menu.Button>
        <BurgerIcon color={buttonColor} />
      </Menu.Button>

      <Menu.Items
        className={`absolute z-20 -right-[20px] px-4 py-4 space-y-5 ${topPadding} ${widthClass} ${heightClass}`}
        style={style}>
        {[...links, hotzone]}
      </Menu.Items>
    </Menu>
  );
}
