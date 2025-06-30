
'use client';
import React from 'react'
import Link from 'next/link'
import { TypingAnimation } from "@/components/magicui/typing-animation";
import confetti from "canvas-confetti";
 import { Button } from "@/components/ui/button";
 import { MorphingText } from "@/components/magicui/morphing-text";
// import { color } from 'framer-motion';

const handleClick = () => {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  const randomInRange = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  const interval = window.setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
};

const texts = [
  "Discover destinations beyond your wildest dreams.",
"Embark on an adventure where the world is your playground.",
"Unlock the secrets of the globe and make every journey unforgettable.",
"Explore the unseen, and let your wanderlust take flight.",
"Journey to places that will leave you speechless and craving more.",
"Step into a world of endless possibilities and untold stories.",
"Venture into the unknown and create memories that last a lifetime.",
"Your dream destinations are just a passport away."
];


export default function Hero() {
  return (
    <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
      <video
        autoPlay
        loop
        muted
        className="absolute z-0 w-auto min-w-full min-h-full max-w-none"
      >
        <source src="/futuristic-city.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="z-10 text-center">
        <h1 
        className="text-9X1 md:text-9x3 font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
        <TypingAnimation className='title'>Explore the Future</TypingAnimation>
        </h1>
        <p className="text-xl md:text-2xl mb-8"><MorphingText texts={texts} /></p>
        <Link href="/india-states">
        <Button onClick={handleClick} className='btnst'>Start Your Journey</Button>
        </Link>
      </div>
    </section>
  )
}

