import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  alignCenter?: boolean;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  subtitle,
  alignCenter,
  className
}) => {
  const centerClass = alignCenter
    ? "flex flex-col items-center justify-center text-center"
    : "justify-start";
  return (
    <div className={`content-container bg-secondary-default ${centerClass}`}>
      <div className={`${className || ""}`}>
        <p className="text-primary-orange uppercase design-overline">{title}</p>
        <h2 className={`mt-3 max-w-6xl ${centerClass}`}>{subtitle}</h2>
      </div>
    </div>
  );
};

export default SectionHeader;
