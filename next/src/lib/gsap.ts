import gsap from "gsap";
import { useEffect } from "react";

export const useAnimateElements = () => {
  useEffect(() => {
    gsap
      .timeline()
      .fromTo(
        ".anim-gif",
        {
          filter: "blur(50px) brightness(2)",
        },
        {
          filter: "blur(0px) brightness(1)",
          delay: 0.2,
          duration: 2,
          ease: "power3",
        },
      )
      .fromTo(
        ".anim-el, .anim-el-wrapper > *",
        {
          opacity: 0,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          filter: "blur(0px)",
          // stagger: {
          //   amount: 2,
          //   from: "start",
          // },
          duration: 1,
          ease: "accelerate",
        },
        "-=2",
      );
  }, []);
};
