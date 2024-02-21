import { useEffect, useState } from "react";

interface ICard {
  id: string;
  isVisible: boolean;
}

// Add an additional parameter for the initial index
const useGetCurrentCard = (cards: ICard[], initialIndex: number) => {
  // Use the initialIndex to set the initial state of currentCard
  const [currentCard, setCurrentCard] = useState(initialIndex);
  const visibleCard = cards.findIndex((card) => card.isVisible);

  useEffect(() => {
    // Only update the currentCard if a visible card is detected and it's different from the current
    if (visibleCard >= 0 && visibleCard !== currentCard) {
      setCurrentCard(visibleCard);
    }
  }, [visibleCard, currentCard]); // Include currentCard in the dependency array to avoid unnecessary updates

  return currentCard;
};

export { useGetCurrentCard };
