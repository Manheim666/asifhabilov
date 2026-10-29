"use client";

// All motion on the page: smooth scroll, intro, hero, reveals, horizontal work
// scroller, counters, marquee and cursor. Markup stays usable without it.
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger);

const fmt = (v, d) => v.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

export default function Motion() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      root.classList.add("reduced");
      return;
    }

    // Smooth scroll, driven by GSAP's ticker so ScrollTrigger stays in sync
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 1 });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onAnchor = (e) => {
      const a = e.target.closest("a[data-scroll]");
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || !id.startsWith("#")) return;
      e.preventDefault();
      const dest = id === "#top" ? 0 : id;
      const offset = id === "#work" || id === "#top" ? 0 : -72;
      const el = id === "#top" ? null : document.querySelector(id);
      const y = el ? el.getBoundingClientRect().top + window.scrollY + offset : 0;
      if (Math.abs(y - window.scrollY) > window.innerHeight * 2.5) {
        // Long jump: fade through a curtain instead of scrubbing every scroll animation on the way
        gsap.timeline()
          .to(".jump-curtain", { opacity: 1, duration: 0.3, ease: "power2.in" })
          .add(() => { lenis.scrollTo(dest, { immediate: true, force: true, offset }); ScrollTrigger.update(); })
          .to(".jump-curtain", { opacity: 0, duration: 0.55, ease: "power2.out", delay: 0.08 });
      } else {
        lenis.scrollTo(dest, { duration: 1.2, offset });
      }
    };
    document.addEventListener("click", onAnchor);

    const ctx = gsap.context(() => {
      // Scroll progress bar
      gsap.to(".progress", { scaleX: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: true } });

      // Intro curtain: counter + bar, then the curtain lifts and the name rises
      const intro = gsap.timeline({ defaults: { ease: "expo.inOut" } });
      const counter = { v: 0 };
      intro
        .to(counter, { v: 100, duration: 1.1, ease: "power2.inOut", onUpdate: () => {
          const el = document.querySelector(".intro-count"); if (el) el.textContent = String(Math.round(counter.v)).padStart(3, "0");
        } }, 0)
        .to(".intro-bar", { scaleX: 1, duration: 1.1, ease: "power2.inOut" }, 0)
        .to(".intro", { yPercent: -100, duration: 1 }, 1.15)
        .from("[data-hero-media]", { scale: 1.25, duration: 1.8, ease: "expo.out" }, 1.15)
        .from(".hero-name .char", { yPercent: 115, rotate: 6, duration: 1.2, stagger: 0.035, ease: "expo.out" }, 1.4)
        .from(".hud i", { scale: 2.4, opacity: 0, duration: 0.9, stagger: 0.06, ease: "expo.out" }, 1.55)
        .from("[data-hero-fade]", { y: 24, opacity: 0, duration: 0.9, stagger: 0.08, ease: "power3.out" }, 1.75)
        .set(".intro", { display: "none" });

      // Hero parallax as you scroll away
      gsap.to("[data-hero-media]", { yPercent: 18, scale: 1.08, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
      gsap.to(".hero-inner", { yPercent: -12, opacity: 0.15, ease: "none", scrollTrigger: { trigger: ".hero", start: "40% top", end: "bottom top", scrub: true } });

      // Generic reveals
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        gsap.to(el, { opacity: 1, y: 0, duration: 1.1, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 97%" } });
      });

      // Count-up numbers
      gsap.utils.toArray("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const d = parseInt(el.dataset.decimals || "0", 10);
        const o = { v: 0 };
        el.textContent = fmt(0, d);
        gsap.to(o, { v: end, duration: 1.8, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" },
          onUpdate: () => { el.textContent = fmt(o.v, d); } });
      });

      // Marquee that speeds up with scroll velocity
      const rows = gsap.utils.toArray("[data-marquee]");
      const loops = rows.map((row) => {
        const dir = parseFloat(row.dataset.marquee);
        const w = row.scrollWidth / 2;
        gsap.set(row, { x: dir > 0 ? 0 : -w });
        return gsap.to(row, { x: dir > 0 ? -w : 0, duration: 38, ease: "none", repeat: -1 });
      });
      lenis.on("scroll", ({ velocity }) => {
        const s = 1 + Math.min(Math.abs(velocity) / 8, 4);
        loops.forEach((l) => gsap.to(l, { timeScale: s, duration: 0.3, overwrite: true }));
      });

      // Timeline line draws as you scroll
      gsap.to("[data-timeline-fill]", { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-timeline]", start: "top 75%", end: "bottom 60%", scrub: true } });

      // Work: horizontal scroll on large screens, vertical reveals on small ones
      const mm = gsap.matchMedia();
      mm.add("(min-width: 64rem)", () => {
        const track = document.querySelector("[data-work-track]");
        const pin = document.querySelector("[data-work-pin]");
        const panels = gsap.utils.toArray("[data-panel]");
        const label = document.querySelector("[data-work-progress]");
        const dist = () => track.scrollWidth - window.innerWidth;
        const tween = gsap.to(track, {
          x: () => -dist(), ease: "none",
          scrollTrigger: {
            trigger: pin, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 1, invalidateOnRefresh: true, anticipatePin: 1,
            onUpdate: (st) => { if (label) label.textContent = `0${Math.min(panels.length, Math.floor(st.progress * panels.length) + 1)} / 0${panels.length}`; },
          },
        });
        panels.forEach((p, i) => {
          const img = p.querySelector("[data-parallax]");
          if (!img.classList.contains("fit-contain")) gsap.fromTo(img, { xPercent: -4, scale: 1.1 }, { xPercent: 4, scale: 1.1, ease: "none",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
          if (i === 0) return; // first panel is already on screen when the pin starts
          gsap.from(p.querySelector("[data-panel-media]"), { opacity: 0, scale: 0.92, duration: 1, ease: "expo.out",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 80%" } });
          gsap.from(p.querySelectorAll(".panel-body > *"), { y: 30, opacity: 0, stagger: 0.06, duration: 0.9, ease: "power3.out",
            scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 65%" } });
        });
      });
      mm.add("(max-width: 63.99rem)", () => {
        gsap.utils.toArray("[data-panel]").forEach((p) => {
          gsap.from(p.querySelector("[data-panel-media]"), { opacity: 0, scale: 0.94, duration: 1, ease: "expo.out", scrollTrigger: { trigger: p, start: "top 90%" } });
          gsap.from(p.querySelectorAll(".panel-body > *"), { y: 24, opacity: 0, stagger: 0.05, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: p, start: "top 70%" } });
          const pimg = p.querySelector("[data-parallax]");
          if (!pimg.classList.contains("fit-contain")) gsap.fromTo(pimg, { yPercent: -8 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } });
        });
      });
    });

    // Bracket cursor that follows the pointer and grows on links
    const cursor = document.querySelector(".cursor");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    let onMove, onOver;
    if (cursor && fine) {
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.35, ease: "power3" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.35, ease: "power3" });
      onMove = (e) => { xTo(e.clientX); yTo(e.clientY); cursor.style.opacity = "1"; };
      onOver = (e) => cursor.classList.toggle("is-link", !!e.target.closest("a, button, .bento-card li"));
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerover", onOver);
    }

    // Spotlight that follows the pointer across the skill cards
    const bento = document.querySelector("[data-spotlight]");
    const onSpot = (e) => bento.querySelectorAll(".bento-card").forEach((c) => {
      const r = c.getBoundingClientRect();
      c.style.setProperty("--mx", `${e.clientX - r.left}px`);
      c.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
    if (bento && fine) bento.addEventListener("pointermove", onSpot);

    // Magnetic contact headline
    const magnet = document.querySelector("[data-magnet]");
    const onMag = (e) => {
      const r = magnet.getBoundingClientRect();
      gsap.to(magnet, { x: (e.clientX - r.left - r.width / 2) * 0.04, y: (e.clientY - r.top - r.height / 2) * 0.08, duration: 0.6, ease: "power3.out" });
    };
    const offMag = () => gsap.to(magnet, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.5)" });
    if (magnet && fine) { magnet.addEventListener("pointermove", onMag); magnet.addEventListener("pointerleave", offMag); }

    // Re-measure once images and fonts settle
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      ctx.revert();
      gsap.ticker.remove(tick);
      lenis.destroy();
      document.removeEventListener("click", onAnchor);
      window.removeEventListener("load", refresh);
      if (onMove) window.removeEventListener("pointermove", onMove);
      if (bento && fine) bento.removeEventListener("pointermove", onSpot);
      if (onOver) window.removeEventListener("pointerover", onOver);
      if (magnet && fine) { magnet.removeEventListener("pointermove", onMag); magnet.removeEventListener("pointerleave", offMag); }
    };
  }, []);

  return null;
}
