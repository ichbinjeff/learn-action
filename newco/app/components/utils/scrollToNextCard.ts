const scrollToNextCard = (currentCard: number, nCards: number) => {
  const element = document.getElementById("client-carousel");
  if (!element) return;

  const nextCard = currentCard + 1;
  if (nextCard === nCards) return (element.scrollLeft = 0);

  element.scrollLeft += element.scrollWidth / nCards;
};

export { scrollToNextCard };
