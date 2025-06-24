"use client";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function GsapAnimator() {
  useEffect(() => {
    gsap.from(".gsap-hero-title", {
      opacity: 0,
      y: -50,
      duration: 1,
      ease: "power3.out",
    });
    gsap.from(".gsap-hero-subtitle", {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
      delay: 0.3,
    });

    gsap.utils.toArray<HTMLDivElement>(".gsap-feature-card").forEach((card, i) => {
      gsap.from(card, {
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
        opacity: 0,
        y: 30,
        duration: 0.6,
        ease: "power3.out",
        delay: i * 0.1,
      });
    });
  }, []);
  return null;
}