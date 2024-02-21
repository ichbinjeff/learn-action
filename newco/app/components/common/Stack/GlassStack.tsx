import "./glass.css";

interface GlassStackProps {
  selectedItem: number | undefined;
  items: { id: number; img: string }[];
  defaultImage: string;
}

export default function GlassStack({
  selectedItem,
  items,
  defaultImage
}: GlassStackProps) {
  return (
    <div className="relative">
      <img
        src={defaultImage}
        alt="Default Image"
        className={`w-full object-cover absolute ${
          selectedItem === undefined
            ? "image-transition-active"
            : "image-transition-leave"
        }`}
      />
      {items.map((item) => (
        <img
          key={item.id}
          src={item.img}
          alt={`Image ${item.id}`}
          className={`w-full object-cover absolute ${
            selectedItem === item.id
              ? "image-transition-active"
              : "image-transition-leave"
          }`}
        />
      ))}
    </div>
  );
}
