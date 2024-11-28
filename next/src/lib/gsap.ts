import gsap from "gsap";
import { useEffect } from "react";

export const useAnimateElements = () => {
  useEffect(() => {
    const elements = document.querySelectorAll(
      ".anim-gif, .anim-el, .anim-el-wrapper > *",
    );

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        const inViewElements = entries
          .filter((entry) => entry.isIntersecting)
          .map((entry) => entry.target);

        if (inViewElements.length > 0) {
          gsap.fromTo(
            inViewElements,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 1,
              stagger: 0.1,
              ease: "accelerate",
            },
          );

          inViewElements.forEach((element) => {
            observerInstance.unobserve(element);
          });
        }
      },
      {
        threshold: 0.25,
      },
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);
};
