import { useState, useEffect, useRef } from "react";
import { IClientTestimonial } from "@/app/services/strapi/types";
import { goToCard } from "../../utils/goToCard";
import ClientCard from "./TestimonialCard";
import Controls from "./TestimonialController";

interface ICCarouselProps {
  testimonials: IClientTestimonial[];
}

export interface ICard extends IClientTestimonial {
  id: string;
  isVisible: boolean;
}

const Carousel: React.FC<ICCarouselProps> = ({
  testimonials
}: ICCarouselProps) => {
  const rootElemId = "client-carousel";
  const cards: ICard[] = [];
  for (let i = 0; i < testimonials.length; i++) {
    const cardId = `${rootElemId}-${i}`;
    const card: ICard = {
      ...testimonials[i],
      id: cardId,
      isVisible: false
    };
    cards.push(card);
  }
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(-1);
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollToCard = (index: number, mode: ScrollBehavior = "smooth") => {
    const carousel = carouselRef.current;
    if (carousel) {
      const cardWidth = carousel.scrollWidth / cards.length;
      carousel.scrollTo({
        left: cardWidth * index,
        behavior: mode
      });
      setCurrentCardIndex(index);
    }
  };

  const updateCurrentCardIndexBasedOnScroll = () => {
    const carousel = carouselRef.current;
    if (carousel) {
      const scrollLeft = carousel.scrollLeft;
      const cardWidth = carousel.scrollWidth / cards.length;
      const newCurrentIndex = Math.round(scrollLeft / cardWidth);
      setCurrentCardIndex(newCurrentIndex);
    }
  };

  // Scroll to the random card initially
  useEffect(() => {
    const index = Math.floor(Math.random() * cards.length);
    scrollToCard(index, "instant");
  }, []); // Empty dependency array ensures this runs once on mount

  // Set up auto play
  useEffect(() => {
    if (currentCardIndex === -1) return;

    const interval = setInterval(() => {
      const nextIndex = (currentCardIndex + 1) % cards.length;
      scrollToCard(nextIndex);
    }, 10000); // Change card every 10 seconds

    return () => clearInterval(interval);
  }, [currentCardIndex]);

  // Listen for scroll events to update the current card index
  // and controller status
  useEffect(() => {
    if (currentCardIndex === -1) return;

    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener("scroll", updateCurrentCardIndexBasedOnScroll);
      return () =>
        carousel.removeEventListener(
          "scroll",
          updateCurrentCardIndexBasedOnScroll
        );
    }
  }, [currentCardIndex]);

  return (
    <div>
      <div className="px-4 md:px-8 py-5 flex flex-col gap-7 bg-white border-rounded-bl-none">
        <div
          ref={carouselRef}
          className="grow w-full flex flex-row overflow-scroll snap-x snap-mandatory no-scrollbar scroll-smooth">
          {cards.map((card, idx) => (
            <ClientCard key={idx} {...card} />
          ))}
        </div>
      </div>

      <div className="grow-0 mt-7">
        <Controls
          items={cards}
          currentCard={currentCardIndex}
          goToCard={goToCard}
        />
      </div>
    </div>
  );
};

export default Carousel;
