import { useState, useEffect } from "react";

const useIsVisible = (cardId: string, rootElemId: string) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let options = {
      root: document.getElementById(rootElemId),
      rootMargin: "0px",
      threshold: 0
    };
    const callback = (
      entries: IntersectionObserverEntry[],
      observer: IntersectionObserver
    ) => {
      setVisible(entries[0].isIntersecting);
    };
    const observer = new IntersectionObserver(callback, options);
    const target: any = document.getElementById(cardId);

    if (target) observer.observe(target);
  }, []);

  return visible;
};

export { useIsVisible };
