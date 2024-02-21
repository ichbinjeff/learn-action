const goToCard = (cardId: string, immediate = false) => {
  const element = document.getElementById(cardId);
  if (immediate && element) {
    const scrollContainer = element.parentNode as HTMLElement;
    const elementLeftPosition = element.offsetLeft;
    scrollContainer.scrollLeft = elementLeftPosition;
    return;
  }

  element?.scrollIntoView({
    behavior: "auto",
    block: "nearest",
    inline: "start"
  });
};

export { goToCard };
