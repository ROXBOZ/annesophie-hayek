import gsap from "gsap";
import { useEffect } from "react";

export const useAnimateElements = () => {
  useEffect(() => {
    gsap.fromTo(
      ".anim-gif, .anim-el, .anim-el-wrapper > *",
      {
        opacity: 0,
        filter: "blur(5px)",
      },
      {
        backgroundColor: "red",
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.75,
        ease: "accelerate",
        stagger: 0.1,
      },
    );
  }, []);
};
