export interface IconLinkProps {
  href?: string;
  img: string;
  alt: string;
  onClick?: () => void;
}

export default function IconLink({ href, img, alt, onClick }: IconLinkProps) {
  if (!img) return null;
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      <img src={img} alt={alt} />
    </a>
  );
}
