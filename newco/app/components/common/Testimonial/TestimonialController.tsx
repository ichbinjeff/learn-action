import { ICard } from "./TestimonialCarousel";
import SquareControlButton from "../../icon/SquareControlButton";

export default function Controls({
  items,
  currentCard,
  goToCard
}: {
  items: ICard[];
  currentCard: number;
  goToCard: (cardId: string) => void;
}) {
  return (
    <div className="flex gap-3">
      {items.map((item, idx) => (
        <div key={idx} className="cursor-pointer">
          <div className="mx-auto w-fit">
            <SquareControlButton
              onClick={() => {
                goToCard(item.id);
              }}
              isSelected={idx === currentCard}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
