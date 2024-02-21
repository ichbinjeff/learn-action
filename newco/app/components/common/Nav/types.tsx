export interface INavBarProps {
  id?: string;
  logo: string;
  logoAltText?: string;
  heightClass?: string;
  navLinks: INavLink[];
  buttonColor?: string;
  hotzoneText?: string;
  current?: string;
  hotzoneOnClick?: () => void;
}

export interface INavLink {
  text: string;
  href: string;
}

export interface IBugerMenuProps {
  buttonColor?: string;
  navLinks: INavLink[];
  hotzoneText?: string;
  hotzoneOnClick?: () => void;
}
