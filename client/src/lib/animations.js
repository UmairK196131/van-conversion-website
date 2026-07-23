import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initHomeAnimations() {
  const sections = document.querySelectorAll('[data-animate-section]');

  sections.forEach((section) => {
    const items = section.querySelectorAll('[data-animate-item]');

    if (items.length) {
      gsap.from(items, {
        y: 32,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 82%',
          once: true,
        },
      });
    } else {
      gsap.from(section, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 85%',
          once: true,
        },
      });
    }
  });

  const hero = document.querySelector('[data-hero]');
  if (hero) {
    gsap.from(hero.querySelectorAll('[data-hero-item]'), {
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
      delay: 0.2,
    });
  }
}

export function destroyHomeAnimations() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}
