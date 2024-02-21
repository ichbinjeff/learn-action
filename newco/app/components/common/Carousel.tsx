"use client";

import Card from "@/app/components/common/ImageCard";
import { useEffect, useState, useRef } from "react";
import { LeftArrowButton, RightArrowButton } from "./ArrowButton";

export interface ICard {
  id: string;
  header: string;
  subHeader: string;
  imgUrl: string;
  imgAltText?: string;
  cardClass?: string;
  imgClass?: string;
  descClass?: string;
  paperColor?: string;
  noBorder?: boolean;
}
export interface ICarouselProps {
  cards: ICard[];
}

export default function Carousel({ cards }: ICarouselProps) {
  // State to keep track of the last visible card
  const [lastVisibleCards, setLastVisibleCards] = useState(new Set<string>());

  // State to keep track of the current index in the carousel
  const [currentIndex, setCurrentIndex] = useState(0);

  // Ref for the carousel container element
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Return early if the ref is not attached to a DOM element
    if (!carouselRef.current) return;

    // Options for the IntersectionObserver
    const options = {
      root: carouselRef.current,
      rootMargin: "0px",
      threshold: 1.0 // 100% of the item must be visible
    };

    // Variable to keep track of the last visible card's ID
    let lastVisibleCard = "";

    // Setting up the IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
      const currentVisibleCards = new Set<string>([]);
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Update the last visible card's ID
          lastVisibleCard = entry.target.id;
          currentVisibleCards.add(lastVisibleCard);
        }
      });

      // Update the state with the last visible card
      setLastVisibleCards(currentVisibleCards);
    }, options);

    // Observe each card for visibility changes
    cards.forEach((card) => {
      const element = document.getElementById(card.id);
      if (element) observer.observe(element);
    });

    // Cleanup function to disconnect the observer
    return () => observer.disconnect();
  }, []);

  const goToCard = (direction: "next" | "prev") => {
    let newIndex = currentIndex;

    // Update the index based on the direction
    if (direction === "next") {
      newIndex = currentIndex + 1 >= cards.length ? 0 : currentIndex + 1;
    } else if (direction === "prev") {
      newIndex = currentIndex - 1 < 0 ? cards.length - 1 : currentIndex - 1;
    }

    // Update the current index state
    setCurrentIndex(newIndex);

    // Scroll to the new target card
    const targetCard = cards[newIndex];
    if (targetCard) {
      const element = document.getElementById(targetCard.id);
      element?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    top: 0,
    right: 0,
    left: "90%",
    width: "10%",
    bottom: 0,
    background:
      "linear-gradient(270deg, #F4FBFF 17%, rgba(244, 251, 255, 0.00) 100%)"
  };

  return (
    <div className="content-container px-4">
      <div className="relative">
        <div
          ref={carouselRef}
          className=" flex flex-row gap-5 overflow-scroll snap-x snap-mandatory no-scrollbar">
          {cards.map((card) => (
            // Render each card in the carousel
            <Card key={card.id} {...card} />
          ))}
        </div>
        {lastVisibleCards.has(cards[cards.length - 1].id) || (
          <div
            style={overlayStyle}
            className="hidden md:block h-full overflow-hidden"></div>
        )}
      </div>

      <div className="mt-7 h-20">
        {/* Show previous button only if the first card is not visible */}
        {!lastVisibleCards.has(cards[0].id) && (
          <LeftArrowButton onClick={() => goToCard("prev")} />
        )}
        {/* Show next button only if the last card is not the last visible card */}
        {lastVisibleCards.has(cards[cards.length - 1].id) || (
          <RightArrowButton
            className="float-right"
            onClick={() => goToCard("next")}
          />
        )}
      </div>
    </div>
  );
}
